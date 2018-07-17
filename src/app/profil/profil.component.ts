import {Component, OnInit} from '@angular/core';
import {PourmiamService} from '../PourmiamService';
import {Router} from '@angular/router';
import {Profil} from './Module/profil';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
})
export class ProfilComponent implements OnInit {
  public ShowConnexion = 0;
  private $auth;
  public User = new Profil();
  private errorServer = '';

  constructor(private pourmiamService: PourmiamService,
              private router: Router) {
  }

  ngOnInit() {
    this.getauthent();
    this.pourmiamService.getUser();
    this.userlist();
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

  public userlist() {
    this.pourmiamService.getUser()
      .then(response => {
        this.errorServer = '';
        this.User = response;
        console.log('userlist Response() response = ', this.User);
      }, error => {
        console.log('listactivite listactivite() error = ' + error);
        this.errorServer = error;
      });
  }

  public changepassword() {
    this.router.navigate(['/login']);
  }


}
