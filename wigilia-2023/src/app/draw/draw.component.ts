import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawService } from '../services/draw.service';
import { Osoba } from '../models/draw.model';
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
  persons!: Osoba[];
  person: Osoba = {
    foto: '',
    key: '',
    podpis: '',
    wykluczenia: [],
    wylosowanaOsoba: ''
  };
  imie: string = '';
  wykluczenia!: string[] | null;
  personsToDraw: string[];
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
    this.personsToDraw = [];
    this.randomNumber = 0;
  }

  ngOnInit(): void {
    this.drawService.getAllPersons().subscribe((osoby) => {
      osoby.map(osoba => this.testMap(osoba)); 
      this.persons = osoby;

      this.drawService.getPerson(this.imie).subscribe(osoba => {
        this.person = osoba;
        this.wykluczenia = this.person?.wykluczenia ?? null;
        
        if (this.person.wylosowanaOsoba) {
          this.isDrawn = true;
          this.personDrawn = this.persons.find(x => x.key = this.person.wylosowanaOsoba) as Osoba;
        }
      });

    });    
  }

  testMap(osoba: any) {
    if (this?.person?.wykluczenia.find(x => x == osoba.key) || this.person?.key == osoba.key) {
      console.log("Znaleziono: " + osoba.key);
    }
    else {
      console.log("WWWWW: " + this.personsToDraw);
      this.personsToDraw.push(osoba.key);
    }
  }

  draw() {
    var flipResult = Math.random();

    setTimeout(() => {
      if (flipResult <= 0.5)
        this.coinClass = 'heads';
      else
        this.coinClass = 'tails';
    }, 100);

    this.randomNumber = Math.floor(Math.random() * this.personsToDraw.length);
    console.log(this.randomNumber, this.personsToDraw[this.randomNumber], this.persons);
    console.log(this.persons.find(x => x.key == this.personsToDraw[this.randomNumber]));

    if (this.persons.find(x => x.key == this.personsToDraw[this.randomNumber])) {
      this.personDrawn = this.persons.find(x => x.key == this.personsToDraw[this.randomNumber]) as Osoba;
      this.person.wylosowanaOsoba = this.personDrawn.key;
    }
    
    this.drawService.editPerson(this.person?.key, this.person);

    setTimeout(() => {
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
