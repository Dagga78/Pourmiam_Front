import { Component, OnInit } from '@angular/core';
import {PourmiamService} from '../PourmiamService';
import {ActivatedRoute, Router} from '@angular/router';
import {Restaurant} from '../Module/Restaurant';

const FIRST_DIV = 1;

@Component({
  selector: 'app-restaurantdetail',
  templateUrl: './restaurantdetail.component.html'
})
export class RestaurantdetailComponent implements OnInit {

  public ShowConnexion = 0;
  private $auth;
  public ville;
  public errorServer = '';
  public Restaurant = new Restaurant();

  constructor(public pourmiamService: PourmiamService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getauthent();
    this.route.params.subscribe((params) => {
      // console.log("InscriptionComponent token = " + params.token);
      if (params.id !== undefined) {
        this.pourmiamService.getRestaurant(params.id)
          .then(response => {
              this.Restaurant = response;
              console.log('getListOfRestaurant onsubmit() response = ' + this.Restaurant);
            },
            error => {
              // console.log('LoginComponent onSubmit() error = ' + error);
              this.errorServer = error;
            });
      }
    });
  }

  getauthent() {
    this.$auth = this.pourmiamService.getAuthent();
    console.log(this.$auth);
    if (this.$auth !== null) {
      this.ShowConnexion = 1;
    }
  }

  disconnect() {
    this.$auth = this.pourmiamService.unsetAuthent();
    console.log(this.$auth);
    this.ShowConnexion = 0;
    this.router.navigate(['']);
  }

}
