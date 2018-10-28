import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js'; //https://www.joshmorony.com/adding-responsive-charts-graphs-to-ionic-2-applications/

import { Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

/**
 * Generated class for the AnalyticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-analytics',
  templateUrl: 'analytics.html',
})
export class AnalyticsPage {

  @ViewChild('barCanvas') barCanvas;
     @ViewChild('doughnutCanvas') doughnutCanvas;
     @ViewChild('lineCanvas') lineCanvas;
     @ViewChild('radarCanvas') radarCanvas;

     barChart: any;
     doughnutChart: any;
     lineChart: any;
     radarChart: any;

public userID: any = "99798951";
public supermarketTotal: any = 0.0;
public clothingTotal: any = 0.0;
public electronicsTotal: any = 0.0;
public apiURL: any;
public itemList: any;
public itemCategories: any;
public freshFood: any = 0.0;
public drinks: any = 0.0;
public alcoholicDrinks: any = 0.0;
public houseCleaning: any = 0.0;
public accessories: any = 0.0;
public womenClothing: any = 0.0;
public menClothing: any = 0.0;
public footwear: any = 0.0;
public childClothing: any = 0.0;
public phone: any = 0.0;
public printer: any = 0.0;
public mouse: any = 0.0;
public keyboard: any = 0.0;
public laptop: any = 0.0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,   public platform: Platform) {

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


//get through api the receipts
           this.http.post(this.apiURL+'/api/v1/getReceipt?id='+this.userID, {headers: headers})
                   //.map(res => res.json())
              .subscribe(data => {
              console.log("items");
                   console.log(data);
                    this.itemList = JSON.parse(data['_body']);


//for loop to get the totals per category to use for the cahrts
                    for (let il of this.itemList) {

                        if(il.vendor_category == "Supermarket"){
                            this.supermarketTotal = this.supermarketTotal + parseFloat(il.total);
                        }else if(il.vendor_category == "Clothing Store"){
                            this.clothingTotal = this.clothingTotal + parseFloat(il.total);
                        }else if(il.vendor_category == "Electronic Store"){
                            this.electronicsTotal = this.electronicsTotal + parseFloat(il.total);
                        }
                    }

                      this.http.post(this.apiURL+'/api/v1/getItemsCategoriesTotals?id='+this.userID, {headers: headers})
                         .subscribe(data => {
                              var tempItems = JSON.parse(data['_body']);

                              for (let ti of tempItems) {
                                if (ti.category == "freshFood") {
                                  this.freshFood = this.freshFood + parseFloat(ti.price);
                                } else if (ti.category == "drinks") {
                                  this.drinks = this.drinks + parseFloat(ti.price);
                                } else if (ti.category == "alcoholicDrinks") {
                                  this.alcoholicDrinks = this.alcoholicDrinks + parseFloat(ti.price);
                                } else if (ti.category == "houseCleaning") {
                                  this.houseCleaning = this.houseCleaning + parseFloat(ti.price);
                                } else if (ti.category == "accessories") {
                                  this.accessories = this.accessories + parseFloat(ti.price);
                                } else if (ti.category == "womenClothing") {
                                  this.womenClothing = this.womenClothing + parseFloat(ti.price);
                                } else if (ti.category == "menClothing") {
                                  this.menClothing = this.menClothing + parseFloat(ti.price);
                                } else if (ti.category == "footwear") {
                                  this.footwear = this.footwear + parseFloat(ti.price);
                                } else if (ti.category == "childClothing") {
                                  this.childClothing = this.childClothing + parseFloat(ti.price);
                                } else if (ti.category == "phone") {
                                  this.phone = this.phone + parseFloat(ti.price);
                                } else if (ti.category == "printer") {
                                  this.printer = this.printer + parseFloat(ti.price);
                                } else if (ti.category == "mouse") {
                                  this.mouse = this.mouse + parseFloat(ti.price);
                                } else if (ti.category == "keyboard") {
                                  this.keyboard = this.keyboard + parseFloat(ti.price);
                                } else if (ti.category == "laptop") {
                                  this.laptop = this.laptop + parseFloat(ti.price);
                                }
                              }
                              console.log("items");
                              console.log(data);
                              console.log("items shite");
                              console.log(this.freshFood);


                              this.barChart = new Chart(this.barCanvas.nativeElement, {
                                     type: 'bar',
                                     labels: "Electronics",
                                     data: {
                                         labels: [
                                                  "Fresh Food",
                                                  "Drinks",
                                                  "Alcoholic Drinks",
                                                  "House Cleaning Products",
                                                  "Accessories",
                                                  "Women Clothing",
                                                  "Men Clothing",
                                                  "Child Clothing",
                                                  "Footwear",
                                                  "Phone",
                                                  "Printer",
                                                  "Mouse",
                                                  "Keyboard",
                                                  "Laptop"],
                                         datasets: [{
                                             data: [
                                               this.freshFood,
                                               this.drinks,
                                               this.alcoholicDrinks,
                                               this.houseCleaning,
                                               this.accessories,
                                               this.womenClothing,
                                               this.menClothing,
                                               this.childClothing,
                                               this.footwear,
                                               this.phone,
                                               this.printer,
                                               this.mouse,
                                               this.keyboard,
                                               this.laptop],
                                             backgroundColor: [
                                               '#800000',
                                               '#9A6324',
                                               '#808000',
                                               '#469990',
                                               '#000075',
                                               '#000000',
                                               '#e6194B',
                                               '#f58231',
                                               '#ffe119',
                                               '#bfef45',
                                               '#3cb44b',
                                               '#42d4f4',
                                               '#4363d8',
                                               '#911eb4',
                                             ],
                                             borderColor: [
                                               '#800000',
                                               '#9A6324',
                                               '#808000',
                                               '#469990',
                                               '#000075',
                                               '#000000',
                                               '#e6194B',
                                               '#f58231',
                                               '#ffe119',
                                               '#bfef45',
                                               '#3cb44b',
                                               '#42d4f4',
                                               '#4363d8',
                                               '#911eb4',
                                             ],
                                             borderWidth: 1
                                         }]
                                     },
                                     options: {
                                       legend: {
                                            display: false
                                        },
                                         title: {
                                           display: true,
                                           text: 'Fine-grain view'
                                         },
                                         scales: {
                                             yAxes: [{
                                                 ticks: {
                                                     beginAtZero:true
                                                 }
                                             }]
                                         }
                                     }

                                 });
                         });

                             this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

                               type: 'doughnut',
                               data: {
                                   labels: ["Electronics", "Clothing", "Supermarket"],
                                   datasets: [{
                                       label: '€ spent per Category',
                                       data: [this.electronicsTotal, this.clothingTotal, this.supermarketTotal],
                                       backgroundColor: [
                                           'rgba(255, 99, 132, 0.2)',
                                           'rgba(54, 162, 235, 0.2)',
                                           'rgba(255, 206, 86, 0.2)',
                                           'rgba(75, 192, 192, 0.2)',
                                           'rgba(153, 102, 255, 0.2)',
                                           'rgba(255, 159, 64, 0.2)'
                                       ],
                                       hoverBackgroundColor: [
                                           "#FF6384",
                                           "#36A2EB",
                                           "#FFCE56",
                                           "#FF6384",
                                           "#36A2EB",
                                           "#FFCE56"
                                       ]
                                   }]
                               }

                           });

                            this.lineChart = new Chart(this.lineCanvas.nativeElement, {
                                type: 'line',
                                data: {
                                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                                    datasets: [
                                        {
                                            label: "Electronics",
                                            fill: false,
                                            lineTension: 0.1,
                                            backgroundColor: "rgba(75,192,192,0.4)",
                                            borderColor: "rgba(75,192,192,1)",
                                            borderCapStyle: 'butt',
                                            borderDash: [],
                                            borderDashOffset: 0.0,
                                            borderJoinStyle: 'miter',
                                            pointBorderColor: "rgba(75,192,192,1)",
                                            pointBackgroundColor: "#fff",
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                            pointHoverBorderColor: "rgba(220,220,220,1)",
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 1,
                                            pointHitRadius: 10,
                                            data: [65, 59, 80, 81, 56, 55, 40],
                                            spanGaps: false,
                                        },
                                        {
                                            label: "Clothing",
                                            fill: false,
                                            lineTension: 0.1,
                                            backgroundColor: "#911eb4",
                                            borderColor: "#911eb4",
                                            borderCapStyle: 'butt',
                                            borderDash: [],
                                            borderDashOffset: 0.0,
                                            borderJoinStyle: 'miter',
                                            pointBorderColor: "#911eb4",
                                            pointBackgroundColor: "#fff",
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: "#911eb4",
                                            pointHoverBorderColor: "rgba(220,220,220,1)",
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 1,
                                            pointHitRadius: 10,
                                            data: [78, 40, 140, 89, 33, 0, 55],
                                            spanGaps: false,
                                        },
                                        {
                                            label: "Supermarket",
                                            fill: false,
                                            lineTension: 0.1,
                                            backgroundColor: "#800000",
                                            borderColor: "#800000",
                                            borderCapStyle: 'butt',
                                            borderDash: [],
                                            borderDashOffset: 0.0,
                                            borderJoinStyle: 'miter',
                                            pointBorderColor: "#800000",
                                            pointBackgroundColor: "#fff",
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: "#800000",
                                              pointHoverBorderColor: "rgba(220,220,220,1)",
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 1,
                                            pointHitRadius: 10,
                                            data: [120, 59, 50, 40, 20, 20, 20],
                                            spanGaps: false,
                                        }
                                    ]
                                }

                            });

                            this.radarChart = new Chart(this.radarCanvas.nativeElement, {
                                type: 'radar',
                                data: {
                                    labels: ["Fresh Food", "Alcoholic Drinks", "House Cleaning Products", "Drinks"],
                                    datasets: [
                                        {
                                            label: "2017",
                                            fill: false,
                                            lineTension: 0.1,
                                            backgroundColor: "rgba(75,192,192,0.4)",
                                            borderColor: "rgba(75,192,192,1)",
                                            borderCapStyle: 'butt',
                                            borderDash: [],
                                            borderDashOffset: 0.0,
                                            borderJoinStyle: 'miter',
                                            pointBorderColor: "rgba(75,192,192,1)",
                                            pointBackgroundColor: "#fff",
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: "#000075",
                                            pointHoverBorderColor: "#000075",
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 1,
                                            pointHitRadius: 10,
                                            data: [1165, 950, 350, 700],
                                            spanGaps: false,
                                        },
                                        {
                                            label: "2018",
                                            fill: false,
                                            lineTension: 0.1,
                                            backgroundColor: "#000075",
                                            borderColor: "#000075",
                                            borderCapStyle: 'butt',
                                            borderDash: [],
                                            borderDashOffset: 0.0,
                                            borderJoinStyle: 'miter',
                                            pointBorderColor: "#000075",
                                            pointBackgroundColor: "#fff",
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: "rgba(150,192,192,1)",
                                            pointHoverBorderColor: "rgba(150,220,220,1)",
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 1,
                                            pointHitRadius: 10,
                                            data: [850, 750, 150, 500],
                                            spanGaps: false,
                                        }
                                    ]
                                }

                            });

              });
  }

  ionViewWillEnter(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnalyticsPage');

  }

}
