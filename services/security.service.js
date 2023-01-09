const boom = require("@hapi/boom");
//Importamos jsonwebtoken que nos permite encryptar la data que viaja desde a nuestro servicio
const jwt = require("jsonwebtoken");
const config = require("../configs/config");

class SecurityServices {
    constructor() { }

    generateJWT(data) {
        if (data.userName == config.defaultUser && data.password == config.defaultPassword) {
            const token = jwt.sign(data, config.privateKey, { expiresIn: config.expireTimeToken });
            return token;
        } else {
            throw boom.badRequest('Invalid username or password');
        }
    }

}

module.exports = SecurityServices;
