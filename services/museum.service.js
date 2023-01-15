// Importamos faker para generar aleatoriamente nuevos museos
const { faker } = require('@faker-js/faker')
// Importamos boom para realizar denifir errores de negocio
const boom = require('@hapi/boom');
// Importamos models para obtener la conexion con la bd usando el ORM sequelize
const { models } = require('../libs/sequelize');
// Importamos las variables de ambiente
const { config } = require('../configs/config')

class MuseumServices {
    // Método constructor
    constructor() { }

    // Método que permite para obtener los museos registrados
    async find(limit, type) {
        // Inicializamos el array de museos
        var museums = [];
        // Asignamos el tipo de estatus a consultar del museo
        let queryType = false;
        if (type == 'blocked') {
            queryType = true;
        }
        // Relizamos el filtro de museos
        if (limit && type) {
            // Realizamos la busqueda de los museos filtrados por el elemento isBlocked y limite
            museums = await models.Museum.findAll({ limit: limit, where: { is_bloked: queryType }, order: [['id', config.dbOrderQueries]] });
        } else if (limit) {
            // Realizamos la busqueda de los museos filtrados por el limite
            museums = await models.Museum.findAll({ limit: limit, order: [['id', config.dbOrderQueries]] });
        } else if (type) {
            // Realizamos la busqueda de los museos filtrados por el elemento isBlocked
            museums = await models.Museum.findAll({ where: { is_bloked: queryType }, order: [['id', config.dbOrderQueries]] });
        } else {
            // Realizamos la busqueda de los museos registrados en la base de datos
            museums = await models.Museum.findAll({ order: [['id', config.dbOrderQueries]] });
        }
        // Validamos si no hay museos registrados en la base de datos, de ser asi propagamos un error boom
        if (museums.length == 0) {
            throw boom.notFound('Museums not found');
        }
        // Retornamos los museos obtenidos
        return museums;
    }

    // Método que permite obtener un museo con base al ID
    async findOne(id, forceQuery) {
        /** 
        // Forma de buscar por un where especifico
        const museum = await models.Museum.findOne({ where: { id: id } });       
        */
        // Realizamos la busqueda del museo por primary key
        const museum = await models.Museum.findByPk(id);
        // Validamos si el museo no existe, de ser asi propagamos un error boom
        if (museum == null) {
            throw boom.notFound(`The museum with the id [${id}] not found`);
        }
        // Validamos si el museo esta bloqueado, de ser asi propagamos un error boom
        if (!forceQuery || Boolean(forceQuery) == false) {
            if (museum.isBlocked) {
                throw boom.conflict(`The museum [${museum.name}] is blocked`);
            }
        }
        // Retornamos el museo obtenido
        return museum;
    }

    // Método que permite registrar un nuevo museo
    async create(museum) {
        // Realizamos el create del museo enviando la informacion de nuestro request
        const museumCreated = await models.Museum.create(museum);
        // Retornamos el museo creado
        return museumCreated;
    }

    // Método que permite generar un numero de museos con datos aleatorios
    async generate(limit) {
        // Creamos los museos
        for (let index = 1; index <= limit; index++) {
            let museum = {
                name: `Museo ${faker.address.country()} ${faker.address.cityName()}`,
                description: faker.lorem.paragraph(),
                address: faker.address.streetAddress(),
                city: faker.address.cityName(),
                image: 'https://www.unesco.org/sites/default/files/2021-09/museums.jpg',
                isBlocked: faker.datatype.boolean()
            };
            // Realizamos el create del museo
            await models.Museum.create(museum);
        }
    }

    // Método que permite actualizar un nuevo museo
    async update(id, data) {
        // Obtenemos el index del museo
        const museum = await this.findOne(id, true);
        // Asignamos fecha actual al elemento updateAt
        data.updateAt = new Date().toISOString();
        // Realizamos el update del museo obtenido enviando la informacion de nuestro request
        const museumUpdated = museum.update(data);
        // Retornamos el museo modificado
        return museumUpdated;
    }

    // Método que permite truncar la tabla museo
    async deleteAll() {
        // Realizamos un truncate de la tabla museum
        await models.Museum.destroy({ truncate: true, cascade: false });
        // Retornamos respuesta exitosa
        return true;
    }

    // Método que permite eliminar un museo
    async deleteOne(id) {
        // Obtenemos el index del museo
        const museum = await this.findOne(id);
        // Realizamos el delete el museo obtenido
        await museum.destroy();
        // Retornamos el id el museo eliminado
        return id;
    }

}

// Exportamos clase
module.exports = MuseumServices;
