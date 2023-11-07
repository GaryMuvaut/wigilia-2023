import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Osoba } from '../models/draw.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DrawService {
  private API_URL = '/osoby';

  constructor(private db: AngularFireDatabase) {}

  getAllPersons(): Observable<Osoba[]> {
    return this.db.list<Osoba>(this.API_URL)
      .snapshotChanges()
      .pipe(map(response => response.map(osoba => this.assignKey(osoba))));
  }

  getPerson(key: string): Observable<Osoba> {
    console.log(`${this.API_URL}/${key}`);
    return this.db.object<Osoba>(`${this.API_URL}/${key}`)
      .snapshotChanges()
      .pipe(map(osoba => this.assignKey(osoba)));
  }

  editPerson(key: string, person: Osoba): Promise<void> {
    return this.db.object<Osoba>(`${this.API_URL}/${key}`).update(person);
  }

  private assignKey(osoba: any) {
    return {...osoba.payload.val(), key: osoba.key};
  }
}
