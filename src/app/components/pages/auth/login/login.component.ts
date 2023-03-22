import { Component } from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

constructor(private authService: AuthService) {
}
  onSubmit(value: any) {
    this.authService.login(value.email, value.password);
  }
}
