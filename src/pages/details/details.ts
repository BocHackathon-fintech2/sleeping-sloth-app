import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';


import { MenuPage } from '../menu/menu';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  public receiptId: any;
  public apiURL: any;
  public cat: any;
  public name: any;
  public date: any;
  public total: any;
  public itemList: any;
  public location: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,   public platform: Platform) {
    this.receiptId = navParams.get("id");
      this.cat = navParams.get("cat");
        this.name = navParams.get("name");
          this.date = navParams.get("date");
            this.total = navParams.get("total");
              this.location = navParams.get("location");

    if ( this.platform.is('android') ) {
      //|| this.platform.is('android')
         // This will only print when on iOS
         this.apiURL = "http://sleepingsloth.com/bochackathon2018";
       }else if(this.platform.is('ios')){
         this.apiURL = "http://sleepingsloth.com/bochackathon2018";
       }else{
         this.apiURL = "/api";

       }

       let headers = new Headers ();
           headers.append('Content-Type', 'application/json; charset=utf-8');
                   headers.append('Accept', '/');

                   headers.append('Access-Control-Allow-Origin','http://sleepingsloth.com/');
                   headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                   headers.append('Access-Control-Allow-Headers', 'Content-Type,Authorization,Upgrade-Insecure-Requests');

           this.http.post(this.apiURL+'/api/v1/getItems?id='+this.receiptId, {headers: headers})
                   //.map(res => res.json())
              .subscribe(data => {
              console.log("items");
                   console.log(data);
                    this.itemList = JSON.parse(data['_body']);

              });







  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  goToMenu(){
    console.log('menu gogogog');
    this.navCtrl.push( MenuPage,  {

    });

  }

}
