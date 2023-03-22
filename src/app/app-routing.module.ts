import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/pages/auth/login/login.component";
import {RegisterComponent} from "./components/pages/auth/register/register.component";
import {ShellComponent} from "./components/shared/shell/shell.component";
import {HomeComponent} from "./components/pages/home/home.component";
import {BlogComponent} from "./components/pages/blog/blog.component";
import {CommentsComponent} from "./components/pages/comments/comments.component";
import {CategoriesComponent} from "./components/pages/categories/categories.component";
import {NotFoundComponent} from "./components/pages/not-found/not-found.component";
import {UsersComponent} from "./components/pages/users/users.component";
import {AddBlogComponent} from "./components/pages/add-blog/add-blog.component";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: '', component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'register', component: RegisterComponent,
    title: 'Register'
  },
  {
    path: '', component: ShellComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard', component: HomeComponent,
        title: 'Dashboard'
      },
      {
        path: 'blog', component: BlogComponent,
        title: 'Blog'
      },
      {
        path: 'create-blog', component: AddBlogComponent,
        title: 'Create Blog'
      },
      {
        path: 'users', component: UsersComponent,
        title: 'Users'
      },
      {
        path: 'comments', component: CommentsComponent,
        title: 'Comments'
      },
      {
        path: 'categories', component: CategoriesComponent,
        title: 'Categories'
      },
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      }
    ]
  },
  {
    path: '**', component: NotFoundComponent
  },
  {
    path: '', redirectTo: 'login', pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
