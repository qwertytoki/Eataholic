import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  baseMetabo;
  activityAmountInfo;
  burnedCalories;
  dietType;
  dietLevel;
  neededCalories;
  protein;
  oil;
  carbo;
  constructor(public navCtrl: NavController) {
    this.activityAmountInfo = "ほぼ座ってる 運動しない";
    this.dietType ="現状維持";
    this.burnedCalories = 0;
    this.dietLevel= 3;
    this.neededCalories = 0;
  }
  ngOnInit(){
    this.slides.lockSwipeToNext(true);
  }
  prevSlide(){
    this.slides.slidePrev();
  }
  nextSlide(){
    this.slides.slideNext();
  }
  calcNutrient(weight,dietLevel,burnedCalories){
    this.updateDietInfo(dietLevel);
    this.updateDailyNutrient(weight,dietLevel,burnedCalories);

  }
  updateDailyNutrient(weight,dietLevel,burnedCalories){
    var coefficient= 1.0;
    switch(dietLevel){
      case 1:
        coefficient= 0.8;
        break;
      case 2:
        coefficient= 0.9;
        break;
      case 3:
        coefficient= 1.0;
        break;
      case 4:
        coefficient= 1.1;
        break;
      case 5:
        coefficient= 1.2;
        break;
    }
    this.neededCalories = Math.round(burnedCalories * coefficient);
    this.protein = weight * 2;
    this.neededCalories - this.protein * 4;
    this.oil = Math.round(this.neededCalories * 0.25 /9);
    this.carbo = Math.round((this.neededCalories - this.protein * 4 - this.oil * 9)/4);
  }

  updateDietInfo(dietLevel){
    switch(dietLevel){
      case 1:
        this.dietType = "減量(約2kg減/月)";
        break;
      case 2:
        this.dietType = "ゆるく減量(約1kg減/月)";
        break;
      case 3:
        this.dietType = "現状維持";
        break;
      case 4:
        this.dietType = "ゆるく増量(約1kg増/月)";
        break;
      case 5:
        this.dietType = "増量(約2kg増/月)";
        break;
    }
  }
  calcMetabo(sex,height,weight,age,activeLevel){
    var isMen = true;
    if(sex =="men"){
      isMen = true;
    }else{
      isMen = false;
    }
    var calories = 0;
    if(height === undefined||weight === undefined||age === undefined){
    }else if(isMen){
      calories = Math.round(10*weight + 6.25*height - 5 *age +5);
    }else{
      calories = Math.round(10*weight + 6.25*height - 5 *age -161) ;
    }
    this.updateBaseMetabo(calories);
    this.updateActivityAmount(activeLevel)
    this.firstPageValidation(height,weight,age);
    this.updateDailyNutrient(weight, this.dietLevel, this.burnedCalories)
  }
  updateBaseMetabo(calories){
    this.baseMetabo = calories;
  }

  firstPageValidation(height,weight,age){
    if(height !=undefined && weight !=undefined && age !=undefined){
      this.slides.lockSwipeToNext(false);
    }
  }
  updateActivityAmount(activeLevel){
    var coefficient = 1.2;
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
        this.activityAmountInfo = "週1~2でスポーツや筋トレ";
        coefficient = 1.5;
        break;
      case 4:
        this.activityAmountInfo = "週3以上でスポーツや筋トレ";
        coefficient = 1.7;
        break;
      case 5:
        this.activityAmountInfo = "筋トレ is Life";
        coefficient = 1.8;
        break;
    }
    this.burnedCalories = Math.round(this.baseMetabo * coefficient);

  }
}
