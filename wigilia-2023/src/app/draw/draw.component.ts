import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawService } from '../services/draw.service';
import { Osoba, WykluczonaOsoba } from '../models/draw.model';
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
  personArray!: Osoba[];
  person: Osoba = {
    foto: '',
    key: '',
    podpis: '',
    wykluczenia: [],
    wylosowanaOsoba: ''
  };
  personName: string = '';
  exclusions!: WykluczonaOsoba[] | null;
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
    if (this.personName) {
      this.drawService.getAllPersons().subscribe((osoby) => {
        this.personToDrawArray = [];
        this.personArray = osoby;
        this.person = this.personArray.find(x => x.key == this.personName) as Osoba;
        this.exclusions = this.person?.wykluczenia;

        osoby.map(osoba => this.setPersonToDrawArray(osoba));

        console.log("Osoby do wylosowania: " + this.personToDrawArray);
        console.log("Osoby wykluczone: " + JSON.stringify(this?.person?.wykluczenia));

        this.removePersonFromArray();
        console.log("Osoby do wylosowania po usunięciu: " + this.personToDrawArray);

        if (this.personToDrawArray.length == 0)
          this.exclusions.map(wykluczonaOsoba => this.personToDrawArray.push(wykluczonaOsoba.osoba));

        console.log("Osoby ostatecznie do wylosowania: " + this.personToDrawArray);

        if (this.person.wylosowanaOsoba) {
          this.isDrawn = true;
          this.personDrawn = this.personArray.find(x => x.key == this.person.wylosowanaOsoba) as Osoba;
        }
      });
    }
  }

  setPersonToDrawArray(osoba: Osoba): void {
    // console.log("osoba.key: " + osoba.key + ", this.person.key: " + this.person?.key +
    //             ", this.person.wykluczenia: " + JSON.stringify(this?.person?.wykluczenia) +
    //             ", osoba.wylosowanaOsoba: " + osoba.wylosowanaOsoba);
    if (!this?.person?.wykluczenia.find(x => x.osoba == osoba.key) && !(this.person?.key == osoba.key))
      this.personToDrawArray.push(osoba.key);
    // else
    //   console.log("nie dodano");
  }

  removePersonFromArray(): void {
    // console.log("removePersonFromArray: " + this.personToDrawArray);
    this.personArray.map(osoba => {
      // console.log("osoba: " + osoba.key + " | " + osoba.wylosowanaOsoba);

      let index = this.personToDrawArray.findIndex(x => x == osoba.wylosowanaOsoba);

      if (index >= 0) {
        // console.log("ZNALEZIONO: " + index + " | " + osoba.wylosowanaOsoba);
        this.personToDrawArray.splice(index, 1);
      }
      else {
        // console.log("NIE ZNALEZIONO: " + osoba.wylosowanaOsoba);
      }
    });
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
        this.personName = 'jagoda';
        break;
      case '5fa58':
        this.personName = 'jarosław';
        break;
      case 'd0bc8':
        this.personName = 'krystyna';
        break;
      case '14e10':
        this.personName = 'lidia';
        break;
      case 'ca1db':
        this.personName = 'marcus';
        break;
      case 'c109c':
        this.personName = 'łukasz';
        break;
      default:
        this.personName = '';
        break;
    }
  }

}
