import { Component, OnInit } from '@angular/core';
import { PourmiamService } from '../PourmiamService';
import {Inscription} from './inscription';

import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
})
export class InscriptionComponent implements OnInit {
  public inscription = new Inscription;

  constructor(
    private pourmiamService: PourmiamService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }
  onsubmit() {
    this.pourmiamService.createAccount(this.inscription);
  }

}
