import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PourmiamService} from '../PourmiamService';
import {Restaurant} from '../Module/Restaurant';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
})


export class RestaurantComponent implements OnInit {

  public ShowConnexion = 0;
  private $auth;
  public ville;
  public errorServer = '';
  public listrestaurant: Restaurant[];
  public url = '';

  constructor(public pourmiamService: PourmiamService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getauthent();
    this.route.params.subscribe((params) => {
      // console.log("InscriptionComponent token = " + params.token);
      if (params.ville !== undefined) {
        this.pourmiamService.getListOfRestaurant(params.ville)
          .then(response => {
              this.listrestaurant = response;
              console.log('getListOfRestaurant onsubmit() response = ' + this.listrestaurant);
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
    this.url = this.route.toString();
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

  searchRestaurant() {
    this.router.navigate(['/restaurant/' + this.ville]);
  }

  detailRestaurant(id) {
    this.router.navigate(['/restaurantdetail/' + id]);
  }

  restaurantup(idrestaurant) {
    this.pourmiamService.RestaurantUp(idrestaurant)
      .then(response => {
          this.errorServer = '';
          console.log('restaurantup onsubmit() response = ' + response);
          this.route.params.subscribe((params) => {
            this.router.navigate(['/restaurant/' + params.ville]);
          });
        },
        error => {
          console.log('restaurantup onSubmit() error = ' + error);
          this.errorServer = error;
        });

  }

  restaurantdown(idrestaurant) {
    this.pourmiamService.RestaurantDown(idrestaurant)
      .then(response => {
          this.errorServer = '';
          console.log('RestaurantDown onsubmit() response = ' + response);
          this.route.params.subscribe((params) => {
            this.router.navigate(['/restaurant/' + params.ville]);
          });
        },
        error => {
          console.log('RestaurantDown onSubmit() error = ' + error);
          this.errorServer = error;
        });

  }
}
