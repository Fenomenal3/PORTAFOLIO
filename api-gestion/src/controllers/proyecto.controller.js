const prisma = require(`../config/prisma`);
const getProyectos = async (req, res, next) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const [proyectos, total] = await Promise.all([
      prisma.proyecto.findMany({
        skip,
        take: limitNumber,
        include: {
          usuario: { select: { nombre: true } },
        },
      }),
      prisma.proyecto.count(),
    ]);

    res.json({
      data: proyectos,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
    });

  } catch (error) {
    next(error);
  }
};
const getProyectoById = async (req,res,next)=>{
    try{
        const proyecto = await prisma.proyecto.findUnique({
            where: {id:Number(req.params.id)},
            include:{tareas:true, usuario:{ select: {nombre:true, email:true}}}
        });
        if(!proyecto){
            return res.status(404).json({message:`Proyecto no encontrado`})
        }
        res.json(proyecto);
    }catch(error){
        next(error);
    }
}
const createProyecto= async (req, res, next)=>{
    try{
        const { nombre, descripcion, usuarioId } = req.body;
        const existingUsuario = await prisma.usuario.findUnique({
            where:{ id:parseInt(usuarioId) },
        });
        if(!existingUsuario){
            return res.status(404).json({ message:`Usuario no encontrado`})
        }
        const proyecto=await prisma.proyecto.create({
            data:{nombre, descripcion, usuarioId},
            
        });
        res.status(201).json(proyecto)
    }catch(error){
        next(error);
    }
}
const updateProyecto = async (req,res,next)=>{
    try {
        const { id } = req.params;
        const { nombre, descripcion, usuarioId } = req.body;
        const data = {};
        if(nombre !== undefined) data.nombre = nombre;
        if(descripcion !== undefined) data.descripcion = descripcion;
        if(usuarioId !== undefined) data.usuarioId = usuarioId;
        if(Object.keys(data).length===0){
            return res.status(400).json({message:`No se enviaron campos para actualizar`})
        }
        const existingUsuario = await prisma.usuario.findUnique({
            where:{ id:parseInt(usuarioId) },
        });
        if(!existingUsuario){
            return res.status(404).json({ message:`Usuario no encontrado`})
        };
        const updateProyecto = await prisma.proyecto.update({
            where:{id:Number(id)},
            data,
        })
        if(!updateProyecto){
            return res.status(400).json({message:`proyecto no encontrado`})
        }
        res.json(updateProyecto);
    }  catch(error){
        next(error)
    }
};
const deleteProyecto = async (req,res,next)=>{
    try{
        const { id } = req.params;
        const existingProyecto = await prisma.proyecto.findUnique({
            where: {id:parseInt(id)},
        });
        if (!existingProyecto){
            return res.status(404).json({message:`proyecto no encontrado`})
        }
        await prisma.proyecto.delete({
            where:{id:parseInt(id)},
        });
        res.status(204).send();
    }catch(error){
        next(error)
    }
}

module.exports = {
    getProyectos,
    getProyectoById,
    createProyecto,
    updateProyecto,
    deleteProyecto
}