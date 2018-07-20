export class Restaurant {
  idRestaurant: string;
  name: string;
  Adresse: string;
  Zipcode: string;
  city: string;
  positif: string;
  negatif: string;

  toString() {
    return ('idRestaurant = ' + this.idRestaurant + '\n' +
      'name = ' + this.name + '\n' +
      'Adresse = ' + this.Adresse + '\n' +
      'Zipcode = ' + this.Zipcode + '\n' +
      'city = ' + this.city + '\n' +
      'positif = ' + this.positif + '\n' +
      'negatif = ' + this.negatif + '\n');
  }
}
