import {Injectable, isDevMode} from '@angular/core';
import {Headers, RequestOptions, ConnectionBackend} from '@angular/http';
import {Http} from '@angular/http';

import {Observable} from 'rxjs';

import {environment} from '../environments/environment';
import {Inscription} from './inscription/inscription';
import {Login} from './login/login';
import {promise} from 'selenium-webdriver';

@Injectable()
export class PourmiamService {
  private baseUrl;
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
    // console.log('createAccount() formdata : ' + formdata.toString());
    const url = `${this.baseUrl}authent/init`;
    return this.http
      .post(url, formdata, {headers: this.options.headers})
      .toPromise()
      .then(response => {
        console.log('CobizService createAccount() response : ', response);
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
