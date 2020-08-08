import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Barcode} from '../model/barcode';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  alert: any;
  barcodeTemp: any;
  constructor(private alertController: AlertController) {}


  returnBarcodeInput(event, barCode, barCodeElement){
        // Init Data
        if(barCode === ""){
           this.barcodeTemp = event;
        } else {
          if (event){
                  var temp = event.replace(this.barcodeTemp,"");
                  if(temp === ''){
                      barCodeElement.el.value = this.barcodeTemp;
                  } else {
                      this.barcodeTemp = temp;
                      barCodeElement.el.value = temp;
                  }
          }
        }
        return this.barcodeTemp;
    }

}
