import {Component, OnInit} from '@angular/core';
import {SubscribersService} from "../../../core/services/subscribers.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  subArray = [];
  constructor(private subService: SubscribersService) {
  }

  ngOnInit(): void {
    this.subService.loadData().subscribe(value => {
      this.subArray = value;
    })
  }

  onDelete(id) {
    this.subService.deleteData(id);
  }
}
