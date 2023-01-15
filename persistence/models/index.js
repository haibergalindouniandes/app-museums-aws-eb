// Importamos nuestro modelo de Museo
const { Museum, MuseumSchema } = require("./museum.model");
// Importamos nuestro modelo de Usuario
const { User, UserSchema } = require("./user.model");

// Función que contiene la configuración inicial correspondiente a las tablas de nuestra DB siguiendo el ORM sequelize
async function setupModels(sequelize) {
    // Definimos nuestro esquema y configuración para manipular Museos
    Museum.init(MuseumSchema, Museum.config(sequelize));
    // Definimos nuestro esquema y configuración para manipular Usuarios
    User.init(UserSchema, User.config(sequelize));
}

// Exportamos función setupModels
module.exports = setupModels;