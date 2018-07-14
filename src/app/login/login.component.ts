import {Component, OnInit} from '@angular/core';
import {PourmiamService} from '../PourmiamService';
import {Login} from './login';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public login = new Login;
  public errorServer = '';				// Affiche les erreurs provenant de l'API
  public ShowConnexion = 0;
  private $auth;

  constructor(
    private pourmiamService: PourmiamService,
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

  onSubmit() {
    this.pourmiamService.login(this.login)
      .then(response => {
          this.errorServer = '';
          // console.log('LoginComponent onsubmit() response = ' + response);
          this.router.navigate(['']);
        },
        error => {
          // console.log('LoginComponent onSubmit() error = ' + error);
          this.errorServer = error;
        });
  }

}
