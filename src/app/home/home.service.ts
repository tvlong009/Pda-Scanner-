import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Barcode} from '../model/barcode';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  alert: any;
  barcodeTemp: any;
  sounds: any = [];
  audioType: string = 'html5';
  constructor(private alertController: AlertController, public nativeAudio: NativeAudio, private platform: Platform) {
     if (platform.is('cordova')) {
        this.audioType = 'native';
      }
  }


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
preload(key, asset) {

      if (this.audioType === 'html5') {

        let audio = {
          key: key,
          asset: asset,
          type: 'html5'
        };

        this.sounds.push(audio);

      } else {

        this.nativeAudio.preloadSimple(key, asset);

        let audio = {
          key: key,
          asset: key,
          type: 'native'
        };

        this.sounds.push(audio);
      }

    }

play(key) {

       let audio = this.sounds.find((sound) => {
         return sound.key === key;
       });

       if (audio.type === 'html5') {

         let audioAsset = new Audio(audio.asset);
         audioAsset.play();

       } else {

         this.nativeAudio.play(audio.asset).then((res) => {
           console.log(res);
         }, (err) => {
           console.log(err);
         });

       }

     }
}
