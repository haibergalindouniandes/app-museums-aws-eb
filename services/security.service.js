//Importamos boom para la propagación de errores
const boom = require("@hapi/boom");
//Importamos jsonwebtoken que nos permite generar el JWT
const jwt = require("jsonwebtoken");
//Importamos las variables de ambiente
const { config } = require('../configs/config')
//Importamos UserService
const UserService = require("./user.service");
//Generamos la instancia de UserService
const service = new UserService();

class SecurityServices {
    // Método constructor
    constructor() { }

    // Método que permite generar el token
    async generateJWT(data) {
        // Realizamos la busqueda del usuario en base de datos
        let user = await service.findOne(data.userName);
        // Validamos si las credenciales son correctas
        if (data.userName == user.email && data.password == user.password) {
            // Generamos el token
            const token = jwt.sign(data, config.privateKey, { expiresIn: Number(config.expireTimeToken) });
            // Retornamos el token
            return token;
        } else {
            // Propagamos un error boom
            throw boom.unauthorized('Invalid username or password');
        }
    }

}

// Exportamos clase
module.exports = SecurityServices;
