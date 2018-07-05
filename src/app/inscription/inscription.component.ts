import {Component, OnInit} from '@angular/core';
import {PourmiamService} from '../PourmiamService';
import {Inscription} from './inscription';

import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
})
export class InscriptionComponent implements OnInit {
  public inscription = new Inscription;
  public errorServer = '';				// Affiche les erreurs provenant de l'API
  public Password = '';				// Affiche les erreurs provenant de l'API
  public VPassword = '';				// Affiche les erreurs provenant de l'API
  constructor(
    private pourmiamService: PourmiamService,
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.Password === this.VPassword) {
      this.inscription.password = this.Password;
      this.pourmiamService.createAccount(this.inscription)
        .then(response => {
            this.errorServer = '';
            console.log('InscriptionComponent onsubmit() response = ' + response);
          },
          error => {
            console.log('InscriptionComponent onSubmit() error = ' + error);
            this.errorServer = error;
          });
    } else {
      this.errorServer = 'Les mots de passe ne sont pas identique';
    }
  }

}
