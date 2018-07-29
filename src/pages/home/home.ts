import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  baseMetabo;
  activityAmountInfo;
  burnedCalories;
  constructor(public navCtrl: NavController) {
    this.activityAmountInfo = "ほぼ座ってる 運動しない";
    this.burnedCalories = 0;
  }
  calculate(sex,height,weight,age){
    var isMen = true;
    if(sex =="men"){
      isMen = true;
    }else{
      isMen = false;
    }
    var calories = 0;
    if(height === undefined||weight === undefined||age === undefined){
    }else if(isMen){
      calories = 10*weight + 6.25*height - 5 *age +5 ;
    }else{
      calories = 10*weight + 6.25*height - 5 *age -161 ;
    }
    this.baseMetabo = calories;
  }
  updateActivityAmount(activeLevel){
    var coefficient = 1;
    switch(activeLevel){
      case 1:
        this.activityAmountInfo = "ほぼ座ってる 運動しない";
        coefficient = 1.2;
        break;
      case 2:
        this.activityAmountInfo = "ウォーキングくらいは (ほとんどの人ここ)";
        coefficient = 1.3;
        break;
      case 3:
        this.activityAmountInfo = "週1~2でスポーツとか筋トレ";
        coefficient = 1.5;
        break;
      case 4:
        this.activityAmountInfo = "週3とかで筋トレする人";
        coefficient = 1.7;
        break;
      case 5:
        this.activityAmountInfo = "めっちゃ筋トレする人";
        coefficient = 1.8;
        break;
    }
    this.burnedCalories = this.baseMetabo * coefficient;

  }
}
