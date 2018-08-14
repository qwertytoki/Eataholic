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
  constructor(public navCtrl: NavController) {
    this.activityAmountInfo = "ほぼ座ってる 運動しない";
    this.dietType ="現状維持";
    this.burnedCalories = 0;
    this.dietLevel= 3;

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
    switch(dietLevel){
      case 1:
        this.dietType = "めっちゃ減量";
        break;
      case 2:
        this.dietType = "減量";
        break;
      case 3:
        this.dietType = "現状維持";
        break;
      case 4:
        this.dietType = "増量";
        break;
      case 5:
        this.dietType = "めっちゃ増量";
        break;
    }
  }
  calculate(sex,height,weight,age,activeLevel){
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
    this.updateBaseMetabo(calories);
    this.updateActivityAmount(activeLevel)
    this.firstPageValidation(height,weight,age);
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
    this.burnedCalories = this.baseMetabo * coefficient;

  }
}
