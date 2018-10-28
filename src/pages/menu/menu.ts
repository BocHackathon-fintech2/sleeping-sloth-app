import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { WallPage } from '../wall/wall';
import { BenefitsPage } from '../benefits/benefits';
import { AnalyticsPage } from '../analytics/analytics';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  goToReceipts(){
    this.navCtrl.push( WallPage,  {

    });
  }

  goToAnalytics(){
    this.navCtrl.push( AnalyticsPage,  {

    });
  }

  goToBenefits(){
    this.navCtrl.push( BenefitsPage,  {

    });
  }

  goToProfile(){
    this.navCtrl.push( ProfilePage,  {

    });
  }



}
