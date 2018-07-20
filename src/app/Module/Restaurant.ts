export class Restaurant {
  idRestaurant: number;
  name: string;
  Adresse: string;
  Zipcode: string;
  city: number;
  positif: number;
  negatif: number;

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
