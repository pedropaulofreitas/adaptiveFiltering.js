import { Component, OnInit } from '@angular/core';
import  { WavParser }  from '../../libs/wav';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { RLS } from '../../../assets/functions/rls.js';

@Component({
  selector: 'app-enhancement',
  templateUrl: './enhancement.component.html',
  styleUrls: ['./enhancement.component.scss']
})
export class EnhancementComponent implements OnInit {

  public _file: any;
  public _fileClean: any;
  public _fileDirty: any;

  public dirtyBuffer: any;
  public cleanBuffer: any;

  public fileloaded = false;

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[]; 
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public context: AudioContext;


   /*************input**************/

   public S = {
    filterOrderNo : 5,
    delta : .000001, //the initial value of the inverse of the deterministic autocorrelation matrix
    lambda : 0.98 //forgetting factor (0<< lambda < 1)
  }
  target: string;
  /*************input**************/

  constructor() { }

  ngOnInit() {

    let vector1 = {data: [0], label: "asd"};
    this.lineChartData.push(vector1);
    this.lineChartLabels =Array.from(Array(...vector1.data))
    this.context = new AudioContext ();

  }

  public handleFiles(event, target: string) {
    if(target == 'clean') {
      this._fileClean =  event.target.files[0];

    }else {
      this._fileDirty =  event.target.files[0];

    }
  }

  public runAdaptiveFilter() {
    
    console.log(this.dirtyBuffer);
    console.log(this.cleanBuffer);

    let dirtyArray = this.buffer2array(this.dirtyBuffer);
    let cleanArray = this.buffer2array(this.cleanBuffer);

    let respose = RLS(dirtyArray, cleanArray, this.S); // Response: outputVector, errorVector, coefficientVector, outputVectorPost, errorVectorPost
    console.log(respose);
    // let errrorVectorDataset = {data: respose[1], label: "error"};
    // let outputVectorDataset = {data: respose[0], label: "output" };

  }

  public buffer2array(buffer) {

    let numberArray: number [];
    for(let i = 0; i < buffer.length; i++) {
      numberArray.push(buffer[i]);
    }
    return numberArray;
  }
  

  public handleClick(target: string) {

    let wavFile = (target == "clean")? new WavParser(this._fileClean) : new WavParser(this._fileDirty);
   
    this.target = target;

   
    let that = this;

    
    
    wavFile.onloadend = function () {


    // 'this' refers to the wav instance
    // let int16Array = new Int16Array(this.buffer, 0, Math.floor(this.buffer.byteLength / 2));
    let uint8Array = new Uint8Array(this.buffer, 0, this.buffer.byteLength );

    

    // let result = new Float32Array(uint8Array.length);
    // for(let i=0; i<uint8Array.length; i++) result[i] = uint8Array[i] / (uint8Array[i] >= 0 ? 32767 : 32768);

    let oldArr = uint8Array;
    let arr = [];
    let maxVal = 1000;
    let delta = Math.floor( oldArr.length / maxVal );

    // avoid filter because you don't want
    // to loop over 10000 elements !
    // just access them directly with a for loop !
    //                                 |
    //                                 V
    for (let i = 0; i < oldArr.length; i=i+delta) {
      arr.push(oldArr[i]);
    }

    let vector = {data: arr, label: "wav"};
    that.lineChartData.push(vector);
    that.lineChartLabels = Array.from(Array(1000).keys())
    that.fileloaded = true;

    if(that.target == "clean") {
      that.cleanBuffer =  uint8Array;
      console.log('clean', that.cleanBuffer);
    } else {
      that.dirtyBuffer =  uint8Array;
      console.log('dirty', that.dirtyBuffer);
    }

    

    that.context.decodeAudioData(uint8Array.buffer, play);

    function play( audioBuffer ) {
       var source = that.context.createBufferSource();
       source.buffer = audioBuffer;
       source.connect( that.context.destination );
       source.start(0);
   }

    
    }; 
  }

  

}
