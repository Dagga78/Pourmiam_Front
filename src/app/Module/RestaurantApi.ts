import {Restaurant} from './Restaurant';

export class RestaurantApi extends Restaurant {

  constructor(fields: Object) {
    super();
    this.idRestaurant = fields['idRestaurant'];
    this.name = fields['name'];
    this.Adresse = fields['Adresse'];
    this.Zipcode = fields['Zipcode'];
    this.city = fields['city'];
    this.positif = fields['positif'];
    this.negatif = fields['negatif'];
  }

}
