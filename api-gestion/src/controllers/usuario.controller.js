const prisma = require(`../config/prisma`)
const getUsuarios = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;  
    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const [usuarios, total] = await Promise.all([
      prisma.usuario.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          nombre: true,
          email: true,
          creadoEn: true,
          ApPaterno:true,
          ApMaterno:true
        },
      }),
      prisma.usuario.count(),
    ]);

    res.json({
      data: usuarios,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    next(error);
  }
};
const getUsuarioById = async (req,res,next)=>{
    try{
        const { id } = req.params;
        const usuario = await prisma.usuario.findUnique({
            where: {id:parseInt(id)},
            select:{id:true, nombre:true, email:true, creadoEn:true}
        });
        if(!usuario){
            return res.status(404).json({message:`Usuario no encontrado`})
        }
        res.json(usuario);
    }catch(error){
        next(error);
    }
}
const createUsuario= async (req, res, next)=>{
    try{
        const { nombre, email, ApPaterno, ApMaterno, password, } = req.body;
        const existingUsuario = await prisma.usuario.findUnique({
            where:{ email },
        });
        if(existingUsuario){
            return res.status(404).json({ message:`El email ya esta en uso`})
        }
        if(!ApPaterno?.trim() && !ApMaterno?.trim()){
            return res.status(404).json({message: "Debes llenar almenos ApPaterno o ApMaterno"})
        }
        const newUsuario=await prisma.usuario.create({
            data:{nombre, email,ApPaterno,ApMaterno, password,},
            select:{id:true, nombre:true, email:true, creadoEn:true,ApPaterno:true, ApMaterno:true,}
        });
        res.status(201).json(newUsuario)
    }catch(error){
        next(error);
    }
}
const updateUsuario = async (req,res,next)=>{
    try {
        const { id } = req.params;
        const { nombre, email, password } = req.body;
        const data = {};
        if(nombre !== undefined) data.nombre = nombre;
        if(email !== undefined) data.email = email;
        if(password !== undefined) data.password = password;
        if(Object.keys(data).length===0){
            return res.status(400).json({message:`No se enviaron campos para actualizar`})
        }
        const updateUsuario = await prisma.usuario.update({
            where:{id:parseInt(id)},
            data,
            select:{id:true, nombre:true, email:true, creadoEn:true}
        }).catch((e)=>{
            if(e.code=== `P2025`) return null;
            throw e;
        });
        if(!updateUsuario){
            return res.status(400).json({message:`usuario no encontrado`})
        }
        res.json(updateUsuario);
    }  catch(error){
        next(error)
    }
};
const deleteUsuario = async (req,res,next)=>{
    try{
        const { id } = req.params;
        const existingUsuario = await prisma.usuario.findUnique({
            where: {id:parseInt(id)},
        });
        if (!existingUsuario){
            return res.status(404).json({message:`Usuario no encontrado`})
        }
        await prisma.usuario.delete({
            where:{id:parseInt(id)},
        });
        res.status(204).send();
    }catch(error){
        next(error)
    }
}
module.exports = { getUsuarios, getUsuarioById, createUsuario,updateUsuario,deleteUsuario}