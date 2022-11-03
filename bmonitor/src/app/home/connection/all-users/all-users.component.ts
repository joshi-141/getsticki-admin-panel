import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: any = [];
  decs: any = [];
  queryParams: any = { pageSize: 20, pageNumber: 0 };
  constructor(private userService: UsersService) { }

  async ngOnInit() {
    const loadUsers = await this.usersCollection();
    if (loadUsers.data) this.users = loadUsers.data;
  }
  async usersCollection(queryParams?: any) {
    return await this.userService.getAllUsers(queryParams);
  }
  async onScroll() {
    this.queryParams.pageSize = this.queryParams.pageSize;
    this.queryParams.pageNumber = this.queryParams.pageNumber + 1;
    const usersCollection: any = await this.usersCollection(this.queryParams);
    if (usersCollection.data) this.users.push(...usersCollection.data);
  }
}
