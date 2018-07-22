import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PourmiamService} from '../PourmiamService';
import {Restaurant} from '../Module/Restaurant';

const FIRST_DIV = 1;

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
})


export class RestaurantComponent implements OnInit {

  public ShowConnexion = FIRST_DIV;
  private $auth;
  public ville;
  public errorServer = '';
  public listrestaurant: Restaurant[];

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

}
