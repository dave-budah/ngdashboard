import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellComponent } from './components/shared/shell/shell.component';
import { HomeComponent } from './components/pages/home/home.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { UsersComponent } from './components/pages/users/users.component';
import { CategoriesComponent } from './components/pages/categories/categories.component';
import { CommentsComponent } from './components/pages/comments/comments.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment.prod";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {NgToastModule} from "ng-angular-popup";
import { AddBlogComponent } from './components/pages/add-blog/add-blog.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InterceptorService} from "./core/services/interceptor.service";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    HomeComponent,
    BlogComponent,
    UsersComponent,
    CategoriesComponent,
    CommentsComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    AddBlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.fireBaseConfig),
    AngularFirestoreModule,
    FormsModule,
    NgToastModule,
    AngularEditorModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
