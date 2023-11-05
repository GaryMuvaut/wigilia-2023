import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawService } from '../services/draw.service';
import { Osoba } from '../models/draw.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {  

  @ViewChild('coin') coin!: ElementRef;
  coinClass!: string;
  isDrawn: boolean = false;
  persons!: Osoba[];
  person!: Osoba;
  imie: string;
  foto: string;

  constructor (
    private drawService: DrawService,
    private route: ActivatedRoute
  ) {
    switch (String(this.route.snapshot.url)) {
      case '92941':
        this.imie = 'jagoda';
        this.foto = 'jagoda';
        break;
      case '5fa58':
        this.imie = 'jarosław';
        this.foto = 'jaroslaw';
        break;
      case 'd0bc8':
        this.imie = 'krystyna';
        this.foto = 'krystyna';
        break;
      case '14e10':
        this.imie = 'lidia';
        this.foto = 'lidia';
        break;
      case 'ca1db':
        this.imie = 'marcus';
        this.foto = 'marcus';
        break;
      case '70333':
        this.imie = 'zuzanna';
        this.foto = 'zuzanna';
        break;
      case 'c109c':
        this.imie = 'łukasz';
        this.foto = 'lukasz';
        break;
      default:
        this.imie = '';
        this.foto = '';
        break;
    }
  }

  ngOnInit(): void {
    // this.drawService.getAllPersons().subscribe(osoba => {
    //   console.log("aaaaa" + JSON.stringify(osoba));
    //   this.persons = osoba;
    // });

    this.drawService.getPerson(this.imie).subscribe(osoba => {
      console.log("bbbbb" + JSON.stringify(osoba));
      this.person = osoba;
    });


  }

  coinFlip() {
    var flipResult = Math.random();

    this.coinClass = 'dupa';

    setTimeout(() => {
      if (flipResult <= 0.5)
        this.coinClass = 'heads';
      else
        this.coinClass = 'tails';
    }, 100);

    setTimeout(() => {
      this.isDrawn = true;
    }, 3100);

  };

}
