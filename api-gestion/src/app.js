require(`dotenv`).config();
const express = require(`express`);
const cors = require(`cors`);
const { swaggerSpec, swaggerUi }=require(`./config/swagger`);
const usuarioRoutes = require(`./routes/usuario.routes`);
const proyectoRoutes = require(`./routes/proyecto.routes`);
const tareaRoutes = require(`./routes/tarea.routes`);

const app=express();
const PORT = process.env.PORT || 3010;
app.get(`/`, (req, res)=>{
    res.send(`Hola Mundo`)
})
app.use(cors());
app.use(express.json());
app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(`/api`, usuarioRoutes);
app.use(`/api`, proyectoRoutes);
app.use(`/api`, tareaRoutes);
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})