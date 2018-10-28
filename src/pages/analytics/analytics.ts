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

     barChart: any;
     doughnutChart: any;
     lineChart: any;

public userID: any = "99798951";
public supermarketTotal: any = 0.0;
public clothingTotal: any = 0.0;
public electronicsTotal: any = 0.0;

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
                      console.log(this.supermarketTotal);
                        console.log(this.clothingTotal);
                          console.log(this.electronicsTotal);





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



                           this.barChart = new Chart(this.barCanvas.nativeElement, {

                                  type: 'bar',
                                  data: {
                                      labels: ["Electronics", "Clothing", "Supermarket"],
                                      datasets: [{
                                          label: '# of Votes',
                                          data: [this.electronicsTotal, this.clothingTotal, this.supermarketTotal],
                                          backgroundColor: [
                                              'rgba(255, 99, 132, 0.2)',
                                              'rgba(54, 162, 235, 0.2)',
                                              'rgba(255, 206, 86, 0.2)',
                                              'rgba(75, 192, 192, 0.2)',
                                              'rgba(153, 102, 255, 0.2)',
                                              'rgba(255, 159, 64, 0.2)'
                                          ],
                                          borderColor: [
                                              'rgba(255,99,132,1)',
                                              'rgba(54, 162, 235, 1)',
                                              'rgba(255, 206, 86, 1)',
                                              'rgba(75, 192, 192, 1)',
                                              'rgba(153, 102, 255, 1)',
                                              'rgba(255, 159, 64, 1)'
                                          ],
                                          borderWidth: 1
                                      }]
                                  },
                                  options: {
                                      scales: {
                                          yAxes: [{
                                              ticks: {
                                                  beginAtZero:true
                                              }
                                          }]
                                      }
                                  }

                              });


                            this.lineChart = new Chart(this.lineCanvas.nativeElement, {

                                type: 'line',
                                data: {
                                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                                    datasets: [
                                        {
                                            label: "My First dataset",
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
