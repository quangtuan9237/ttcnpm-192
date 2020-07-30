import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private db: AngularFireDatabase) {
  }

  isAdmin(id: string): AngularFireObject<any>{
    return this.db.object('/roles/admins/'+ id);
  }

  getAllVendor(){
    return this.db.list("/roles/vendors").snapshotChanges().pipe(
      map(changes => changes.map(c => {
        let value:Object = c.payload.val();
        return { key: c.key, ...value}
      }))
    )
  }
}
