import { Component, OnInit } from '@angular/core';
// import {RLS} from '../../../../filters/rls.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-select',
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.scss']
})
export class AppSelectComponent {

  public play = false;

  select(){
    this.play = true;

  }

}
