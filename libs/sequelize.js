// Importamos las dependencias
const { Sequelize } = require('sequelize');
const { config } = require('../configs/config');
const setupModels = require('../persistence/models');

// Coenxión con nuestra base de datos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `${config.dbDialect}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const logging = (config.dbLogging === 'true');
const sequelize = new Sequelize(URI, {
    dialect: config.dbDialect,
    logging: logging
});

// Denifimos nuestra configuración inicial
setupModels(sequelize);
// Sincronizamos la creación de nuestras tablas
sequelize.sync().then(() => {
    // Consultamos los usuarios registrados
    sequelize.query('SELECT * FROM users').then((result) => {
        let users = result[0];
        // Validamos si hay usuarios registrados
        if (users.length == 0) {
            // Generamos nuestro string de inserción
            let queryInsert = `INSERT INTO users (email, password, role, status) VALUES ('${config.defaultUser}', '${config.defaultPassword}', 'Administrador', 'A')`;
            // Registramos el usuario root
            sequelize.query(queryInsert).then((userCreated) => {
                if (userCreated) {
                    console.log('User root created')
                }
            });
        }
    });
});

// Exportamos sequelize
module.exports = sequelize;