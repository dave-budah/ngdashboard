import {Component, OnInit} from '@angular/core';
import {LoaderService} from "../../../core/services/loader.service";
import {AuthService} from "../../../core/services/auth.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  userEmail: string;
  constructor(public loader: LoaderService, private authService: AuthService) {
  }
  ngOnInit(): void {
  //   Sidebar toggle js
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    const menuText = document.querySelectorAll('.menuText');
    menuBtn!.addEventListener('click', () => {
      menu!.classList.toggle('open');
      menuText.forEach(function(text, index){
        setTimeout(() => {
          text.classList.toggle('open');
        }, index * 50);
      })
    });

  //   User data in localStorage

    this.userEmail = JSON.parse(localStorage.getItem('user')).email;

  }

  onLogout() {
    this.authService.logout();
  }
}
