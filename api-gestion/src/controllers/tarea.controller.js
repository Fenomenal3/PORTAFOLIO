const prisma = require(`../config/prisma`)
const  getTareas = async (req,res,next)=>{
    try{
        const { proyectoId, estado } = req.query;
        const tarea = await prisma.tarea.findMany({
            where:{ 
                ...(proyectoId && {proyectoId: Number(proyectoId)}),
                ...(estado && { estado }),
            },
            include:{
                proyecto:{ select:{nombre:true}},
                usuario:{ select:{nombre:true}}
            },
        });
        res.json(tarea);
    }catch(error){
        next(error)
    }
}
const getTareaById = async (req,res,next)=>{
    try{
        const { id } = req.params;
        const tarea = await prisma.tarea.findUnique({
            where: {id:parseInt(id)},
            select:{id:true, titulo: true, descripcion:true, estado: true, proyectoId:true, usuarioId:true, creadoEn: true,}
        });
        if(!tarea){
            return res.status(404).json({message:`Tarea no encontrado`})
        }
        res.json(tarea);
    }catch(error){
        next(error);
    }
}
const createTarea= async (req, res, next)=>{
    try{
        const { titulo, descripcion, proyectoId, usuarioId } = req.body;
        
        const tarea=await prisma.tarea.create({
            data:{titulo, descripcion, proyectoId, usuarioId},
        });
        res.status(201).json(tarea)
    }catch(error){
        next(error);
    }
}
const updateTarea = async (req,res,next)=>{
    try{
        const { id } = req.params;
        const { titulo, descripcion, estado, usuarioId, proyectoId } = req.body;
        if(proyectoId !== undefined) {
            const existingProyecto = await prisma.proyecto.findUnique({
                where:{ id:parseInt(proyectoId) },
            });
            if(!existingProyecto){
                return res.status(404).json({ message:`Proyecto no encontrado`})
            }
        }
        if(usuarioId !== undefined){
            const existingUsuario = await prisma.usuario.findUnique({
                where:{ id:parseInt(usuarioId) },
            });
            if(!existingUsuario){
                return res.status(404).json({ message:`Usuario no encontrado`})
            }
        }
        const data = {};
        if(titulo !== undefined) data.titulo = titulo;
        if(descripcion !== undefined) data.descripcion = descripcion;
        if(estado !== undefined) data.estado = estado;
        if(usuarioId !== undefined) data.usuarioId = usuarioId;
        if(proyectoId !== undefined) data.proyectoId = proyectoId;
        if(Object.keys(data).length===0){
            return res.status(400).json({message:`No se enviaron campos para actualizar`})
        }
        
        const updateTarea = await prisma.tarea.update({
            where:{id:Number(req.params.id)},
            data,
        });
        if(!updateTarea){
            return res.status(400).json({message:`tarea no encontrado`})
        }
        res.json(updateTarea)
    }catch(error){
        next(error);
    }
}
const deleteTarea = async (req,res,next)=>{
    try{
        const { id } = req.params;
        const existingTarea = await prisma.tarea.findUnique({
            where: {id:parseInt(id)},
        });
        if (!existingTarea){
            return res.status(404).json({message:`Tarea no encontrado`})
        }
        await prisma.tarea.delete({
            where:{id:parseInt(id)},
        });
        res.status(204).send();
    }catch(error){
        next(error)
    }
}
module.exports = {
    getTareas,
    getTareaById,
    createTarea,
    updateTarea,
    deleteTarea
}