import {Injectable, isDevMode} from '@angular/core';
import {Headers, RequestOptions, ConnectionBackend} from '@angular/http';
import {Http} from '@angular/http';

import {environment} from '../environments/environment';
import {Inscription} from './inscription/inscription';
import {Login} from './login/login';

@Injectable()
export class PourmiamService {
  private baseUrl;
  private $auth;
  private options = new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  });

  constructor(private http: Http) {
    console.log('Dev mode : ' + isDevMode());
    this.baseUrl = environment.baseUrlApi;
    console.log('baseUrl : ' + this.baseUrl);
  }

  createAccount(formdata: Inscription): Promise<any> {
    console.log('createAccount() formdata : ' + formdata.toString());
    const url = `${this.baseUrl}authent/init`;
    return this.http
      .post(url, formdata, {headers: this.options.headers})
      .toPromise()
      .then(response => {
        console.log('PourmiamService createAccount() response : ', response);
        return;
      })
      .catch(this.handleError);
  }

  //    Confirmation d'inscription : le token est envoyé dans le mail d'inscription
  confirmAccount(token: string): Promise<any> {
    // console.log('confirmAccount() token : ' + token);
    const url = `${this.baseUrl}authent/init/${token}/confirm`;
    return this.http
      .get(url, {headers: this.options.headers})
      .toPromise()
      .then(response => {
        console.log('PourmiamService confirmAccount() response : ', response);
        return;
      })
      .catch(this.handleError);
  }

  //    Ajoute l'authent dans les headers
  setAuthent(token: string) {
    // console.log('Pourmiam setAuthent() token : ', token);
    this.options.headers.append('Authorization', token);

  }

  getAuthent() {
    console.log('Pourmiam getAuthent() token : ', this.options.headers.get('Authorization'));
    return this.options.headers.get('Authorization');
  }

  // Retire l'authent des headers
  unsetAuthent() {
    this.options.headers.delete('Authorization');
  }

  login(formdata: Login): Promise<any> {
    console.log('login() formdata : ' + formdata.toString());
    const url = `${this.baseUrl}authent/login`;
    return this.http
      .post(url, formdata, {headers: this.options.headers})
      .toPromise()
      .then(response => {
        console.log('PourmiamService createAccount() response : ', response.json());
        this.setAuthent(response.json().token);
        console.log(this.options.headers.get('Authorization'));
        return;
      })
      .catch(this.handleError);
  }


  //    Gere la recuperation des message d'ereur provenant de l'API
  private handleError(error: any): Promise<any> {
    console.log('An error occurred : ', error);
    if (error.status >= 400 && error.status < 500 && error.status !== 405) {
      //  Recuperation du message d'erreur du serveur nodeJs
      return Promise.reject(JSON.parse(error._body).error.trim());
    } else if (error.status === 405) {
      return Promise.reject(JSON.parse(error._body).message.trim());
    } else {
      if (typeof error === 'string') {
        return Promise.reject(error);
      } else {
        return Promise.reject('Erreur technique, nous faisons notre possible pour corriger le problème !');
      }
    }
  }
}
