import { Component, OnInit, ViewChild, Injectable, Inject} from '@angular/core';
import {Barcode} from '../model/barcode';
import {HomeService} from './home.service';
import { Platform } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  barCode: Barcode;
  barcodeTempOut: any;
  barcodeTempIn: any;
  successFlat: Boolean = false;
  errorFlat: Boolean = false;
  errorBCode: Boolean = false;
  @ViewChild("boxBarcode") boxElement: any;
  @ViewChild("form") form: any;
  @ViewChild("plasticBarcode") plasticElement: any;

  constructor(private homeService: HomeService, private platform: Platform, public keyboard: Keyboard) {
    this.barCode = {
      box:'',
      plastic: ''
    }
  }
  ngOnInit(){
    this.homeService.preload("success", 'assets/sound/successSound.mp3');
    this.homeService.preload("error", 'assets/sound/errorSound.mp3');
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
    if(type === 'success'){
      this.homeService.play("success");
    }
    else {
      this.homeService.play("error");
    }
  }

  cutBarCode(barcode){
    if(barcode){
      var partNo = barcode.substring(0, 7);
      var model = barcode.substring(27, 34);
      return partNo + model;
    }
    return 0;
  }

  clearAll (){
    this.successFlat = false;
    this.errorFlat = false;
    this.errorBCode = false;
    this.barCode.box = '';
    this.barCode.plastic = '';
    this.barcodeTempIn = '';
    this.barcodeTempOut = '';
    this.onAudioPlay("success");
    setTimeout(() => {
      this.form.reset();
    }, 100);
    setTimeout(() => {
      this.boxElement.setFocus();
    }, 200);
       setTimeout(() => {
          this.keyboard.hide();
        }, 300);
  }

    compareTwo(a, b){
      if(a && b){
      if(a.length >= 34 && b.length >= 34) {
           if(this.cutBarCode(a) === this.cutBarCode(b)){
              this.onAudioPlay("success");
              this.successFlat = true;
              this.errorFlat = false;
              this.errorBCode = false;
            } else {
              this.onAudioPlay("error");
              this.errorFlat = true;
              this.successFlat = false;
              this.errorBCode = false; 
            } 
      } else {
          this.onAudioPlay("error");
          this.errorFlat = false;
          this.successFlat = false;
          this.errorBCode = true;
        }
      }
  }

  hideKeyboard(){
     setTimeout(() => {
          this.keyboard.hide();
      }, 300);
  }
}

