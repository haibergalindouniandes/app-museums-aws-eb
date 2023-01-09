const boom = require('@hapi/boom');

class MuseumServices {

  constructor() {
    this.museums = [];
  }

  async find(limit, type) {
    if (this.museums.length == 0) {
      throw boom.notFound('Museums not found');
    }

    let queryType = false;
    if (type == 'blocked') {
      queryType = true;
    }

    if (limit && type) {
      return this.museums.filter(item => item.isBlocked == queryType).slice(0, limit);
    }

    if (limit) {
      return this.museums.slice(0, limit);
    }

    if (type) {
      return this.museums.filter(item => item.isBlocked == queryType)
    }

    return this.museums;
  }

  async create(museum) {
    const consecutive = this.museums.length + 1;
    const existMuseumName = this.museums.find(item => item.name == museum.name);
    if (existMuseumName) {
      throw boom.conflict(`The museum with the name [${museum.name}] already exists`);
    }

    if (!museum.isBlocked) {
      museum.isBlocked = false;
    }

    museum.id = consecutive;
    this.museums.push(museum);
    return museum;
  }

}
module.exports = MuseumServices;
