import {Component, OnInit} from '@angular/core';
import {PourmiamService} from '../PourmiamService';
import {Inscription} from './inscription';

import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';

const FIRST_DIV = 1;
const MAIL_DIV = 2;

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
})


export class InscriptionComponent implements OnInit {
  public inscription = new Inscription;
  public errorServer = '';				// Affiche les erreurs provenant de l'API
  public Password = '';
  public VPassword = '';
  public showDiv = FIRST_DIV;
  public ShowConnexion = 0;
  private $auth;

  constructor(
    private pourmiamService: PourmiamService,
    private router: Router,
    private route: ActivatedRoute
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
    if (this.Password === this.VPassword) {
      this.inscription.password = this.Password;
      this.pourmiamService.createAccount(this.inscription)
        .then(response => {
            this.errorServer = '';
            console.log('InscriptionComponent onsubmit() response = ' + response);
            this.showDiv = MAIL_DIV;
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
