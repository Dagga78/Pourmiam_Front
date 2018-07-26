import {Component, OnInit} from '@angular/core';
import {PourmiamService} from '../PourmiamService';
import {ActivatedRoute, Router} from '@angular/router';
import {Restaurant} from '../Module/Restaurant';
import {Plats} from '../Module/Plats';
import {Commentaire} from '../Module/Commentaire';
import {Profil} from '../profil/Module/profil';
import {NewCommentaire} from '../Module/NewCommentaire';

const FIRST_DIV = 1;

@Component({
  selector: 'app-restaurantdetail',
  templateUrl: './restaurantdetail.component.html'
})
export class RestaurantdetailComponent implements OnInit {

  public ShowConnexion = 0;
  private $auth;
  public ville;
  public errorServer = '';
  public Restaurant = new Restaurant();
  public listplats: Plats[];
  public listCommentaire: Commentaire[];
  public User = new Profil();
  public newCommentary = new NewCommentaire();
  public NoUser = 'Anonyme';

  constructor(public pourmiamService: PourmiamService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getauthent();
    this.pourmiamService.getUser();
    this.userlist();
    this.route.params.subscribe((params) => {
      // console.log("InscriptionComponent token = " + params.token);
      if (params.id !== undefined) {
        this.pourmiamService.getRestaurant(params.id)
          .then(response => {
              this.Restaurant = response;
              console.log('getListOfRestaurant onsubmit() response = ' + this.Restaurant);
              this.getlistPlats(params.id);
              this.getlistCommentaire(params.id);
            },
            error => {
              // console.log('LoginComponent onSubmit() error = ' + error);
              this.errorServer = error;
            });
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

  getlistPlats(idrestaurant) {
    this.pourmiamService.getListOfPlats(idrestaurant)
      .then(response => {
          this.errorServer = '';
          console.log('restaurantup onsubmit() response = ' + response);
          this.listplats = response;
        },
        error => {
          console.log('restaurantup onSubmit() error = ' + error);
          this.errorServer = error;
        });

  }

  getlistCommentaire(idrestaurant) {
    this.pourmiamService.getListOfCommentaire(idrestaurant)
      .then(response => {
          this.errorServer = '';
          console.log('restaurantup onsubmit() response = ' + response);
          this.listCommentaire = response;
        },
        error => {
          console.log('restaurantup onSubmit() error = ' + error);
          this.errorServer = error;
        });

  }

  postCommentaire() {
    if (this.User.firstname !== undefined) {
      this.newCommentary.Nom = this.User.firstname + ' ' + this.User.lastname;
      this.pourmiamService.postCommentaire(this.Restaurant.idRestaurant.valueOf(), this.newCommentary)
        .then(response => {
            this.errorServer = '';
            location.reload();
            // console.log('LoginComponent onsubmit() response = ' + response);
          },
          error => {
            // console.log('LoginComponent onSubmit() error = ' + error);
            this.errorServer = error;
          });
    } else {
      this.newCommentary.Nom = this.NoUser;
      this.pourmiamService.postCommentaire(this.Restaurant.idRestaurant, this.newCommentary)
        .then(response => {
            this.errorServer = '';
            // console.log('LoginComponent onsubmit() response = ' + response);
            location.reload();
          },
          error => {
            // console.log('LoginComponent onSubmit() error = ' + error);
            this.errorServer = error;
          });
    }
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


}
