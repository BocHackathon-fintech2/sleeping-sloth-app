import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';


import { DetailsPage } from '../details/details';

/**
 * Generated class for the WallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wall',
  templateUrl: 'wall.html',
})
export class WallPage {
  public apiURL: any;
  public receiptList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,  public platform: Platform ) {
    if ( this.platform.is('android') ) {
      //|| this.platform.is('android')
         // This will only print when on iOS
         this.apiURL = "http://sleepingsloth.com/bochackathon2018";
       }else if(this.platform.is('ios')){
         this.apiURL = "http://sleepingsloth.com/bochackathon2018";
       }else{
         this.apiURL = "/api";

       }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WallPage');





let headers = new Headers ();
    headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('Accept', '/');

            headers.append('Access-Control-Allow-Origin','http://sleepingsloth.com/');
            headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            headers.append('Access-Control-Allow-Headers', 'Content-Type,Authorization,Upgrade-Insecure-Requests');

    this.http.post(this.apiURL+'/api/v1/getReceipt?id=99798951', {headers: headers})
            //.map(res => res.json())
       .subscribe(data => {
       console.log("receipts");
            console.log(data);
             this.receiptList = JSON.parse(data['_body']);

       });

  }


loadPageDetails(id:any){
  console.log(id);
    this.navCtrl.push( DetailsPage,  {
      id: id
    });

}


}
