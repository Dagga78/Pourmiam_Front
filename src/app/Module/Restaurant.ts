export class Restaurant {
  idRestaurant: string;
  name: string;
  Adresse: string;
  Zipcode: string;
  city: string;
  positif: number;
  negatif: number;
  Budget: number;
  Type_cuisine: number;
  idTypecuisine: number;
  idbudget: number;
  nomBudget: string;
  nomtype: string;
  photo: string;

  toString() {
    return ('idRestaurant = ' + this.idRestaurant + '\n' +
      'name = ' + this.name + '\n' +
      'Adresse = ' + this.Adresse + '\n' +
      'Zipcode = ' + this.Zipcode + '\n' +
      'city = ' + this.city + '\n' +
      'positif = ' + this.positif + '\n' +
      'negatif = ' + this.negatif + '\n' +
      'Budget = ' + this.Budget + '\n' +
      'Type_cuisine = ' + this.Type_cuisine + '\n' +
      'idTypecuisine = ' + this.idTypecuisine + '\n' +
      'idbudget = ' + this.idbudget + '\n' +
      'nomBudget = ' + this.nomBudget + '\n' +
      'photo = ' + this.photo + '\n' +
      'nomtype = ' + this.nomtype + '\n');
  }

}
