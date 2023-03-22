import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs";
import {NgToastService} from "ng-angular-popup";

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private firestore: AngularFirestore, private toast: NgToastService) { }

  loadData() {
    return this.firestore.collection('subscribers').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

  deleteData(id) {
    this.firestore.doc(`subscribers/${id}`).delete().then(docRef => {
      this.toast.success({detail: 'Success', summary: 'Subscriber delete successfully.', duration: 3000});
    })
  }
}
