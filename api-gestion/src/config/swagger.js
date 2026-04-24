const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0", 
    info: {
      title: "API gestion de proyectos",
      version: "1.0.0",
      description: "API REST para la gestion de proyectos",
    },
    servers: [
      {
        url: "http://localhost:5000", 
        description: "Servidor de desarrollo"
      }
    ],
    components: {
      schemas: {
        Usuario:{
            type:`object`,
            properties:{
                id:     {type: `integer`, example:1},
                nombre: {type:`string`, example:`Ruben Quisberth`},
                email:  {type:`string`, example:`rubenjhonatanquisberthorihuela@gmail.com`},
                createAt : {type:`string`, format:`date-time`}
            },
        },
        CrearUsuario:{
            type:`object`,
            required:[`nombre`,`email`,`password`],
            properties:{
                nombre: {type:`string`, example:`Ruben Quisberth`},
                email:  {type:`string`, example:`rubenjhonatanquisberthorihuela@gmail.com`},
                password : {type:`string`, example:`Seguro123!`}
            },
        },
        ActualizarUsuario:{
            type:`object`,
            properties:{
                nombre: {type:`string`, example:`Ruben Quisberth`},
                email:  {type:`string`, example:`rubenjhonatanquisberthorihuela@gmail.com`},
                password : {type:`string`, example:`Seguro123!`}
            },
        },

        Proyecto: {
          type: 'object',
          properties:{
            id:           { type: 'integer', example: 1},
            nombre:       { type: 'string',  example: 'Proyecto Alpha'},
            descripcion:  { type: 'string',  example: 'Descripcion del proyecto'},
            usuarioId:      { type: 'integer', example: 1},
            createAt:     { type: 'string',  example: 'date-time'}
          },
        },
        CrearProyecto:{
          type:`object`,
          required:[`nombre`,`usuarioId`],
          properties:{
              nombre:       {type:`string`,  example:`Proyecto Alpha`},
              descripcion:  {type:`string`,  example:`Descripcion del proyecto`},
              usuarioId :   {type:`integer`, example:1}
          },
        },
        ActualizarProyecto:{
            type:`object`,
            properties:{
              nombre:       {type:`string`,  example:`Proyecto Alpha`},
              descripcion:  {type:`string`,  example:`Descripcion del proyecto`},
              usuarioId :   {type:`integer`, example:1}
            },
        },
        Tarea: {
          type: 'object',
          properties:{
            id:           { type: 'integer', example: 1},
            titulo:       { type: 'string',  example: 'Diseñar base de datos'},
            descripcion:  { type: 'string',  example: 'Crear el esquema ERD'},
            estado:       { type: 'string',  enum: ['PENDIENTE','EN_PROGRESO','COMPLETADA']},
            proyectoId:   { type: 'integer', example: 1},
            usuarioId:    { type: 'integer', example: 1, nullable: true},
            createAt:     { type: 'string',  example: 'date-time'}
          },
        },
        CrearTarea:{
          type:`object`,
          required:[`titulo`,`proyectoId`],
          properties:{
            titulo:       { type: 'string',  example: 'Diseñar base de datos'},
            descripcion:  { type: 'string',  example: 'Crear el esquema ERD'},
            proyectoId:   { type: 'integer', example: 1},
            usuarioId:    { type: 'integer', example: 1, nullable: true},
          },
        },
        ActualizarTarea:{
          type:`object`,
          properties:{
            titulo:       { type: 'string',  example: 'Diseñar base de datos'},
            descripcion:  { type: 'string',  example: 'Crear el esquema ERD'},
            proyectoId:   { type: 'integer', example: 1},
            usuarioId:    { type: 'integer', example: 1, nullable: true},
          },
        },
      },  
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };