import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private db: AngularFireDatabase,
  ) { }

  getAll(){
    return this.db.list("/categories").snapshotChanges().pipe(
      map(changes => changes.map(c => {
        let value:Object = c.payload.val();
        return { key: c.key, value}
      }))
    )
  }
}
