import { Component, OnInit } from '@angular/core';
import {RLS} from '../../../../filters/rls.js';

@Component({
  selector: 'app-app-select',
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.scss']
})
export class AppSelectComponent {

  /*************input**************/
  input = [2,3,4,5,6,7,8,9,10] //desired signal
  desired = [1,2,3,4,5,6,7,8,9] //signal fed into the adaptive filter

   S = {
    filterOrderNo : 3,
    delta : .000001, //the initial value of the inverse of the deterministic autocorrelation matrix
    lambda : 0.98 //forgetting factor (0<< lambda < 1)
  }
  /*************input**************/

  constructor() { }

  signalPrediction() {
    console.log(this.S)
    console.log(RLS(this.desired, this.input, this.S));
  }

}
