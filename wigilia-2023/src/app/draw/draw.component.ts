import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent {

  @ViewChild('coin') coin!: ElementRef;
  coinClass!: string;
  isDrawn: boolean = false;

  coinFlip() {
    var flipResult = Math.random();

    this.coinClass = 'dupa';

    setTimeout(() => {
      if(flipResult <= 0.5){
        this.coinClass = 'heads';
        console.log('it is head');
      }
      else{
        this.coinClass = 'tails';
        console.log('it is tails');
      }
    }, 100);

    setTimeout(() => {
      this.isDrawn = true;
    }, 3100);

    // setTimeout(function(this){
    //   if(flipResult <= 0.5){
    //     this.coin.nativeElement.addClass('heads');
    //     console.log('it is head');
    //   }
    //   else{
    //     $('#coin').addClass('tails');
    //     console.log('it is tails');
    //   }
    // }, 100);
  };

}
