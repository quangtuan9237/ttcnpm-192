import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private db: AngularFireDatabase) {
  }

  isAdmin(id: string): AngularFireObject<any>{
    return this.db.object('/roles/admins/'+ id);
  }
}
