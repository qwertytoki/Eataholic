import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  burnCarolies;
  constructor(public navCtrl: NavController) {

  }
  calculate(sex,height,weight,age){
    var isMen = true;
    if(sex =="men"){
      isMen = true;
    }else{
      isMen = false;
    }
    var calories = 0;
    if(isMen){
      calories = 10*weight + 6.25*height - 5 *age +5 ;
    }else{
      calories = 60;
    }


    this.burnCalories = calories + "kcalです";
  }

}
