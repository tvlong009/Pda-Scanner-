import { Component, OnInit, ViewChild} from '@angular/core';
import {Barcode} from '../model/barcode';
import {HomeService} from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  barCode: Barcode;
  barcodeTempOut: any;
  barcodeTempIn: any;
  successFlat: Boolean;
  errorFlat: Boolean;
  @ViewChild("boxBarcode") boxElement: any;
  @ViewChild("form") form: any;
  @ViewChild("plasticBarcode") plasticElement: any;
  @ViewChild('audioSuccess') audioSuccess: any;
  @ViewChild('audioError') audioError: any;

  constructor(private homeService: HomeService) {
     this.barCode = {
       box:'',
       plastic: ''
     }
  }
  ngOnInit(){
  }

  compareBarcode(event, barCode, barCodeElement) {
       if(this.barCode.box || this.barCode.plastic){
          this.barcodeTempOut = this.homeService.returnBarcodeInput(event, barCode, barCodeElement);
       } else {
          this.barcodeTempOut = event;
       }
       this.compareTwo(this.barcodeTempOut, this.barcodeTempIn);
  }

dataChanged(event){
    this.barcodeTempIn = event;
    this.plasticElement.setFocus();
}

onAudioPlay(type){
    if(type === 'success')
        this.audioSuccess.nativeElement.play();
    else
        this.audioError.nativeElement.play();
  }

clearAll (){
     this.successFlat = null;
     this.errorFlat = null;
     this.barCode.box = '';
     this.barCode.plastic = '';
     this.barcodeTempIn = '';
     this.barcodeTempOut = '';
     setTimeout(() => {
          this.form.reset();
     }, 200);
     setTimeout(() => {
          this.boxElement.setFocus();
     }, 500);
}

compareTwo(a, b){
     if(a === b){
          this.onAudioPlay("success");
          this.successFlat = true;
          this.errorFlat = false;
     } else {
           this.onAudioPlay("error");
           this.errorFlat = true;
           this.successFlat = false;
        }

    }
}