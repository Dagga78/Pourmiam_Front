import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {ProfilComponent} from './profil/profil.component';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {RestaurantComponent} from './restaurant/restaurant.component';
import {RestaurantdetailComponent} from './restaurantdetail/restaurantdetail.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'inscription', component: InscriptionComponent},
  {path: 'inscription/:token/confirm', component: InscriptionComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'forgotpassword', component: ForgotpasswordComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'restaurant/:ville', component: RestaurantComponent},
  {path: 'restaurantdetail/:id', component: RestaurantdetailComponent},
  {path: 'forgotpassword/:token/confirm', component: ForgotpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})


export class AppRoutingModule { }
