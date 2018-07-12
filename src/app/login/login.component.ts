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

  constructor(
    private pourmiamService: PourmiamService,
    private router: Router
  ) {

  }

  ngOnInit() {
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
