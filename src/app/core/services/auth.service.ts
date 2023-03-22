import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;
  constructor(private fireAuth: AngularFireAuth, private toast: NgToastService, private router: Router) {

  }
  login(email, password) {
  this.fireAuth.signInWithEmailAndPassword(email, password).then(logRef => {
    this.toast.success({detail: 'Success', summary: 'You are now logged in.', duration: 3000});
    this.loadUser();
    this.isLoggedInGuard = true;
    this.isLoggedIn.next(true);
    this.router.navigate(['/dashboard']);
  }).catch(e => {
    this.toast.error({detail: 'Error', summary: e, duration: 3000});
  });
}
loadUser(){
    this.fireAuth.authState.subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
    });
}
 logout() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.isLoggedIn.next(false);
      this.isLoggedInGuard = false;
      this.toast.success({detail: 'Success', summary: 'You are now logged out.', duration: 3000});
      this.router.navigate(['/']);
    });
 }
 loggedIn() {
    return this.isLoggedIn.asObservable();
 }
}
