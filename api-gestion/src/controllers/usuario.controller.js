const prisma = require(`../config/prisma`)
const  getUsuarios = async (req,res,next)=>{
    try{
        const ususario = await prisma.usuario.findMany({
            select:{id:true, nombre: true, email:true, creadoEn: true}
        });
        res.json(ususario);
    }catch(error){
        next(error)
    }
}
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
        const { nombre, email, password } = req.body;
        const existingUsuario = await prisma.usuario.findUnique({
            where:{ email },
        });
        if(existingUsuario){
            return res.status(404).json({ message:`El email ya esta en uso`})
        }
        const newUsuario=await prisma.usuario.create({
            data:{nombre, email, password},
            select:{id:true, nombre:true, email:true, creadoEn:true},
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
        res.status(404).send();
    }catch(error){
        next(error)
    }
}
module.exports = { getUsuarios, getUsuarioById, createUsuario,updateUsuario,deleteUsuario}