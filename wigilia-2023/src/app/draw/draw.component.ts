import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawService } from '../services/draw.service';
import { Osoba, WykluczonaOsoba } from '../models/draw.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {  

  @ViewChild('coin') coin!: ElementRef;
  coinClass!: string;
  isDrawn: boolean = false;
  personArray!: Osoba[];
  person: Osoba = {
    foto: '',
    key: '',
    podpis: '',
    wykluczenia: [],
    wylosowanaOsoba: ''
  };
  imie: string = '';
  wykluczenia!: WykluczonaOsoba[] | null;
  personToDrawArray: string[];
  randomNumber: number;
  personDrawn: Osoba = {
    foto: '',
    key: '',
    podpis: '',
    wykluczenia: [],
    wylosowanaOsoba: ''
  };

  constructor (
    private drawService: DrawService,
    private route: ActivatedRoute
  ) {
    this.setName(String(this.route.snapshot.url));  
    this.personToDrawArray = [];
    this.randomNumber = 0;
  }

  ngOnInit(): void {
    this.drawService.getAllPersons().subscribe((osoby) => {
      this.personToDrawArray = [];
      this.personArray = osoby;
      this.person = this.personArray.find(x => x.key == this.imie) as Osoba;
      this.wykluczenia = this.person?.wykluczenia;

      osoby.map(osoba => this.setPersonToDrawArray(osoba)); 

      console.log("Osoby do wylosowania: " + this.personToDrawArray);
      console.log("Osoby wykluczone: " + JSON.stringify(this?.person?.wykluczenia));

      if (this.person.wylosowanaOsoba) {
        this.isDrawn = true;
        this.personDrawn = this.personArray.find(x => x.key == this.person.wylosowanaOsoba) as Osoba;
      }
    });    
  }

  setPersonToDrawArray(osoba: any) {
    if (!this?.person?.wykluczenia.find(x => x.osoba == osoba.key) && !(this.person?.key == osoba.key))
      this.personToDrawArray.push(osoba.key);
  }

  draw() {
    var flipResult = Math.random();

    setTimeout(() => {
      if (flipResult <= 0.5)
        this.coinClass = 'heads';
      else
        this.coinClass = 'tails';
    }, 100);

    setTimeout(() => {
      this.randomNumber = Math.floor(Math.random() * this.personToDrawArray.length);

      if (this.personArray.find(x => x.key == this.personToDrawArray[this.randomNumber])) {
        this.personDrawn = this.personArray.find(x => x.key == this.personToDrawArray[this.randomNumber]) as Osoba;
        this.person.wylosowanaOsoba = this.personDrawn.key;
      }
    
      this.drawService.editPerson(this.person?.key, this.person);
      this.isDrawn = true;
    }, 3100);

  };

  setName(uri: string) {
    switch (uri) {
      case '92941':
        this.imie = 'jagoda';
        break;
      case '5fa58':
        this.imie = 'jarosław';
        break;
      case 'd0bc8':
        this.imie = 'krystyna';
        break;
      case '14e10':
        this.imie = 'lidia';
        break;
      case 'ca1db':
        this.imie = 'marcus';
        break;
      case '70333':
        this.imie = 'zuzanna';
        break;
      case 'c109c':
        this.imie = 'łukasz';
        break;
      default:
        this.imie = '';
        break;
    }
  }

}
