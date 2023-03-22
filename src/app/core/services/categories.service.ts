import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {NgToastService} from "ng-angular-popup";
import {map} from "rxjs";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService{

  constructor(private firestore: AngularFirestore, private toast: NgToastService) { }

  saveData(data: any) {
    this.firestore.collection('categories').add(data).then(docRef => {

      this.toast.success({detail: 'Success', summary: 'Category added successfully.', duration: 3000});
    }).catch(err => {
      this.toast.error({detail: 'Error', summary: err, duration: 3000});
    });
  }

  loadData(){
    return this.firestore.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

  updateData(id: string, EditData: Category) {
    this.firestore.doc(`categories/${id}`).update(EditData).then(docRef => {
      this.toast.success({detail: 'Success', summary: 'Category updated successfully.', duration: 3000});
    })
  }

  deleteData(id: any) {
    this.firestore.doc(`categories/${id}`).delete().then(docRef => {
      this.toast.success({detail: 'Success', summary: 'Category deleted successfully.', duration: 3000});
    })
  }
}
