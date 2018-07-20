import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import {PourmiamService} from './PourmiamService';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Inscription} from './inscription/inscription';
import { ProfilComponent } from './profil/profil.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import {Restaurant} from './Module/Restaurant';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    InscriptionComponent,
    ProfilComponent,
    ForgotpasswordComponent,
    RestaurantComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    PourmiamService,
    Inscription,
    HomeComponent,
    Restaurant
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
