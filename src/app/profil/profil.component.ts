import {Component, OnInit} from '@angular/core';
import {PourmiamService} from '../PourmiamService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
})
export class ProfilComponent implements OnInit {
  public ShowConnexion = 0;
  private $auth;

  constructor(private pourmiamService: PourmiamService,
              private router: Router) {
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
