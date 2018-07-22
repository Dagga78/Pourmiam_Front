import {Component, OnInit} from '@angular/core';
import {Email} from './email';
import {PourmiamService} from '../PourmiamService';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Password} from './password';

const FIRST_DIV = 1;
const MAIL_DIV = 2;
const RESET_DIV = 3;
const CONFIRM_DIV = 4;

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
})
export class ForgotpasswordComponent implements OnInit {
  public ShowConnexion = 0;
  public email = new Email;
  public passwordobj = new Password();
  public password = '';
  public vpassword = '';
  private $auth;
  private errorServer = '';
  public showDivfp = FIRST_DIV;
  private token = '';

  constructor(private pourmiamService: PourmiamService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getauthent();
    this.route.params.subscribe((params) => {
      // console.log("InscriptionComponent token = " + params.token);
      if (params.token !== undefined) {
        this.token = params.token;
        this.showDivfp = RESET_DIV;
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

  changepassword() {
    this.pourmiamService.createResetPassord(this.email)
      .then(response => {
          this.errorServer = '';
          console.log('InscriptionComponent onsubmit() response = ' + response);
          this.showDivfp = MAIL_DIV;
        },
        error => {
          console.log('InscriptionComponent onSubmit() error = ' + error);
          this.errorServer = error;
        });
  }

  confirmpassword() {
    if (this.password === this.vpassword) {
      this.passwordobj.password = this.password;
      this.pourmiamService.confirmResetPassord(this.token, this.passwordobj)
        .then(response => {
            this.errorServer = '';
            console.log('InscriptionComponent onsubmit() response = ' + response);
            this.showDivfp = CONFIRM_DIV;
          },
          error => {
            console.log('InscriptionComponent onSubmit() error = ' + error);
            this.errorServer = error;
          });
    } else {
      this.errorServer = 'Les mots de passe ne sont pas identiques';
    }
  }
}
