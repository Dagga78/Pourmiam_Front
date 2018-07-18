import {Component, OnInit} from '@angular/core';
import {Email} from './email';
import {PourmiamService} from '../PourmiamService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
})
export class ForgotpasswordComponent implements OnInit {
  public ShowConnexion = 0;
  public email = new Email;
  private $auth;
  private errorServer = '';

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

  changepassword() {
    this.pourmiamService.createResetPassord(this.email)
      .then(response => {
          this.errorServer = '';
          console.log('InscriptionComponent onsubmit() response = ' + response);

        },
        error => {
          console.log('InscriptionComponent onSubmit() error = ' + error);
          this.errorServer = error;
        });
  }


}
