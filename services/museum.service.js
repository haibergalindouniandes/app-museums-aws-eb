class MuseumServices {

  constructor() { }

  async find(limit, type) {
    var listMuseums = [];
    for (let index = 0; index < limit; index++) {
      var museum = {
        name: `Museum Created By API - ${index}`,
        description: `enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem - ${index}`,
        address: `9212 Packers Hill - ${index}`,
        city: `Bogota${index}`,
        image: "https://secretldn.com/wp-content/uploads/2022/01/summer-of-culture-british-museum-1024x606-1-666x394.jpg",
        isBlocked: false,
        id: index
      };

      listMuseums.push(museum);
    }

    return listMuseums;
  }

}
module.exports = MuseumServices;
