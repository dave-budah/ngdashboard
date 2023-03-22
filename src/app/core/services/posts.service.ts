import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {NgToastService} from "ng-angular-popup";
import {map} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage: AngularFireStorage,
              private firestore: AngularFirestore,
              private toast: NgToastService,
              private router: Router
  ) { }

  uploadImage(selectedImage, postData, formStatus, id) {
    const filePath = `postImg/${Date.now()}`;

    this.storage.upload(filePath, selectedImage).then(() => {
      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL;

        if (formStatus == 'Update') {
          this.updateData(id, postData);
        } else {
          this.saveData(postData);
        }
      });
    });
  }
  saveData(postData) {
    this.firestore.collection('posts').add(postData).then(docRef => {
      this.toast.success({detail: 'Success', summary: 'Post created successfully.', duration: 3000});
      this.router.navigate(['/blog'])
    });
  }

//   Load posts
  loadData(){
    return this.firestore.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

//   Load a single post
  loadSinglePost(id) {
    return this.firestore.doc(`posts/${id}`).valueChanges();
  }

//   Update Post
  updateData(id, postData) {
    this.firestore.doc(`posts/${id}`).update(postData).then(() => {
      this.toast.success({detail: 'Success', summary: 'Post updated successfully.', duration: 3000});
      this.router.navigate(['/blog'])
    });
  }
//   Delete blog post
  deleteImage(postImgPath, id) {
    this.storage.storage.refFromURL(postImgPath).delete().then(() => {
      this.deleteData(id);
    });
  }
  deleteData(id) {
    this.firestore.doc(`posts/${id}`).delete().then(() => {
      this.toast.success({detail: 'Success', summary: 'Post deleted successfully.', duration: 3000});
    })
  }
//   Feature a blog
  markFeatured(id, featuredData) {
    this.firestore.doc(`posts/${id}`).update(featuredData).then(() => {
      this.toast.success({detail: 'Success', summary: 'Post status updated.', duration: 3000});
    })
  }
}
