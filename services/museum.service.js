class MuseumServices {

  constructor() { }

  async find(limit, type) {
    return [{
      name: `Museum Created By API`,
      description: `enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem`,
      address: `9212 Packers Hill`,
      city: `Bogota`,
      image: "https://secretldn.com/wp-content/uploads/2022/01/summer-of-culture-british-museum-1024x606-1-666x394.jpg",
      isBlocked: false,
      id: 1
    }];
  }

}
module.exports = MuseumServices;
