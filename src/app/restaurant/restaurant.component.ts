import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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

  constructor(public pourmiamService: PourmiamService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.getauthent();
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
