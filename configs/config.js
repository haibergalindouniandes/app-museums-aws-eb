// Importamos dependencias
require('dotenv').config();
// Generamos nuestra constante de configuración
const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    privateKey: process.env.PRIVATE_KEY || '16b8318a-864b-11ed-a1eb-0242ac120002',
    defaultUser: process.env.DEFAULT_USER || 'zlaifer619',
    defaultPassword: process.env.DEFAULT_PASSWORD || 'Zl@ifer619',
    expireTimeToken: process.env.EXPIRE_TIME_TOKEN || 600,
    dbLogging: process.env.DB_LOGGING || 'false',
    dbDialect: process.env.DB_DIALECT || 'postgres',
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || '5432',
    dbUser: process.env.DB_USER || 'postgres',
    dbPassword: process.env.DB_PASSWORD || 'welcome1',
    dbName: process.env.DB_NAME || 'museums',
    dbConnections: process.env.DB_CONNECTIONS || 10,
    dbOrderQueries: process.env.DB_ORDER_QUERIES || 'ASC',
}

// Exportamos constante config
module.exports = { config };
