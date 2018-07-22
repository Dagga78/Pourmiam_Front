import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PourmiamService} from '../PourmiamService';
import {isNodeFlagSet} from 'tslint';
import {Restaurant} from '../Module/Restaurant';
import {Profil} from '../profil/Module/profil';
import {forEach} from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})


export class HomeComponent implements OnInit {
  public ShowConnexion = 0;
  private $auth;
  public $ville;
  public errorServer = '';
  public listrestaurant: Restaurant[];

  constructor(
    private pourmiamService: PourmiamService,
    private route: ActivatedRoute,
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

  searchRestaurant() {
    this.router.navigate(['/restaurant/' + this.$ville]);
  }

}

