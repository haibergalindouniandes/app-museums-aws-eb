// Importamos boom para realizar definir errores de negocio
const boom = require('@hapi/boom');
// Importamos md5 para cifrar información
const md5 = require('md5');
// Importamos models para obtener la conexion con la bd usando el ORM sequelize
const { models } = require('./../libs/sequelize');
// Importamos las variables de ambiente
const { config } = require('../configs/config')

class UserService {
  // Método constructor
  constructor() { }

  // Método que permite para obtener los usuarios registrados
  async find(limit, status) {
    // Inicializamos el array de usuarios
    let users = [];

    // Relizamos el filtro de usuarios
    if (limit && status) {
      // Realizamos la busqueda de los usuarios filtrados por status y limite
      users = await models.User.findAll({ limit: limit, where: { status: status }, order: [['id', config.dbOrderQueries]] });
    } else if (limit) {
      // Realizamos la busqueda de los usuarios filtrados por limite
      users = await models.User.findAll({ limit: limit, order: [['id', config.dbOrderQueries]] });
    } else if (status) {
      // Realizamos la busqueda de los usuarios filtrados por status
      users = await models.User.findAll({ where: { status: status }, order: [['id', config.dbOrderQueries]] });
    } else {
      // Realizamos la busqueda de los usuarios registrados en la base de datos
      users = await models.User.findAll({ order: [['id', config.dbOrderQueries]] });
    }
    // Validamos si no hay usuarios registrados en la base de datos, de ser asi propagamos un error boom
    if (users.length == 0) {
      throw boom.notFound('Users not found');
    }
    // Retornamos los usuarios obtenidos
    return users;
  }

  // Método que permite obtener un usuario con base al ID
  async findOne(id, forceQuery) {
    // Inicializamos la variable user
    let user = {};
    // Validamos si la consulta se hara por ID o por el email
    if (!isNaN(id)) {
      // Realizamos la busqueda del usuario con base al primary key
      user = await models.User.findByPk(id);
    } else {
      //Realizamos la busqueda del usuario con base al email
      user = await models.User.findOne({ where: { email: id } });
    }
    // Validamos si el usuario no existe, de ser asi propagamos un error boom
    if (user == null) {
      throw boom.notFound(`The user [${id}] not found`);
    }
    // Validamos si se debe forzar la consulta del usuario
    if (!forceQuery || (forceQuery !== 'true')) {
      // Validamos si el usuario tiene un status diferente a A (Activo), de ser asi propagamos un error boom
      if (user.status != 'A') {
        throw boom.conflict(`The user [${id}] has a status [${user.status}]`);
      }
    }
    // Retornamos el usuario obtenido
    return user;
  }

  // Método que permite registrar un nuevo usuario
  async create(user, passwordEncrypt) {
    // Validamos si se debe cifrar el password en MD5
    if (passwordEncrypt) {
      let password = user.password;
      user.password = md5(password);
    }
    // Realizamos el create del usuario enviando la informacion de nuestro request
    const userCreated = await models.User.create(user);
    // Retornamos el usuario creado
    return userCreated;
  }

  // Método que permite actualizar un nuevo usuario
  async update(id, data) {
    // Obtenemos el index del usuario
    const user = await this.findOne(id, 'true');
    // Asignamos fecha actual al elemento updateAt
    data.updateAt = new Date().toISOString();
    // Realizamos el update del usuario obtenido enviando la informacion de nuestro request
    const userUpdated = user.update(data);
    // Retornamos el usuario modificado
    return userUpdated;
  }

  // Método que permite eliminar un usuario
  async deleteOne(id, forceDelete) {
    // Obtenemos el usuario
    const user = await this.findOne(id, forceDelete);
    // Realizamos el delete el usuario obtenido
    await user.destroy();
    // Retornamos el id el usuario eliminado
    return id;
  }

}

// Exportamos clase
module.exports = UserService;
