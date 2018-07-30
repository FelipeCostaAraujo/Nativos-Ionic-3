import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { TouchID } from '@ionic-native/touch-id';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  msg;

  constructor(public navCtrl: NavController,private androidFingerprintAuth: AndroidFingerprintAuth, private platform:Platform, public navParams: NavParams,private touchId: TouchID) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goHome(){

    if (this.platform.is('ios')) {

    this.touchId.isAvailable()
  .then(
    res => {
      this.touchId.verifyFingerprint('Entrar no sistena')
      .then(
    res => this.navCtrl.setRoot(HomePage),
    err => this.msg = "Erro no Login"
  );
    },
    err => this.msg = "Não existe esse recurso"
  );

}else if (this.platform.is('android')) {

  
  this.androidFingerprintAuth.isAvailable()
  .then((result)=> {
    if(result.isAvailable){
      // it is available

      this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
        .then(result => {
           if (result.withFingerprint) {
               console.log('Successfully encrypted credentials.');
               console.log('Encrypted credentials: ' + result.token);
                 // apos o sucesso do fingerprint
               this.navCtrl.setRoot(HomePage);


           } else if (result.withBackup) {
             console.log('Successfully authenticated with backup password!');
           } else console.log('Didn\'t authenticate!');
           
        })
        .catch(error => {
           if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
             console.log('Fingerprint authentication cancelled');
           } else console.error(error)
        });
        


    } else {
      // fingerprint auth isn't available
    }
  })
  .catch(error => console.error(error));


   }

 }

}
