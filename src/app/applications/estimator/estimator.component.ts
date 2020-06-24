import { Component, OnInit } from '@angular/core';
import p5  from 'p5';
import p5sound from 'p5/lib/addons/p5.sound';

@Component({
  selector: 'app-estimator',
  templateUrl: './estimator.component.html',
  styleUrls: ['./estimator.component.scss']
})
export class EstimatorComponent implements OnInit {

  private dirtySample: any;
  private cleanSample: any;
  
  private cleanContext = new AudioContext();

  constructor() { }

  ngOnInit() {

  }

    // CARREGAR SINAL DISTORCIDO
    // CARREGAR SINAL LIMPO

    // public getFiles(event, from) {
    //   if(from == "clean"){

        
    //   let file = event.target.files[0];

    //   Dim data As Byte() = File.ReadAllBytes(file)

    //   console.log(file);

      
    //   } else if(from == "dirty") {
    //     this.dirtySample = event.target.files[0];
    //     console.log(this.dirtySample);
    //   }
    // }

   
    // BOTAO DE CLONAR

    // CARREGAR SINAL LIMPO 2
    // PASSAR PELO FLITRO E DEIXAR TOCAR
    
}
