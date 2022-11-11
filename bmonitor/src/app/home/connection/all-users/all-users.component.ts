import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../api/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  id: any;
  i: number = 0;
  show: boolean = false;
  endofPage: boolean = false;
  users: any = [];
  decs: any = [];
  queryParams: any = { skip: 0, take: 10, orderBy: '', orderMethod: '', whereCond:'',
  profile: null};
  public whereQuery: any;
  public display: number = 1;
  constructor(private userService: UserService, private router: Router) { }

  async ngOnInit() {
    await this.mainfunction(this.queryParams);
  }
  async onScroll() {
    if (!this.endofPage) {
      this.queryParams.skip = this.queryParams.skip
        ? this.queryParams.skip +
        (this.queryParams.take ? this.queryParams.take : 10)
        : 10;
      await this.userService.loadUser((data) => {
        const entries = Object.values(data.data);
        data.data.length > 0 ? this.users.push(...entries) : this.endofPage = true
      }, this.queryParams);
    }
  }
  openIt(data: any) {
    this.show = !this.show;
    this.id = data;
  }
  openLink(url: string) {
    this.router.navigate([url]);
  }
  async mainfunction(queryParams: any) {
    await this.userService.loadUser((data) => {
      this.users = Object.values(data.data);
    }, queryParams);
  }
  async sort(data: any) {
    const valueObj = JSON.parse(data.target.value);
    if (valueObj.orderBy.split(".")[1]) {
      this.queryParams.orderBy = valueObj.orderBy.split(".")[1];
      this.queryParams.profile = valueObj.orderBy.split(".")[0];
      this.queryParams.orderMethod = valueObj.orderMethod
    } else {
      this.queryParams.orderBy = valueObj.orderBy;
      this.queryParams.orderMethod = valueObj.orderMethod
    }
    await this.mainfunction(this.queryParams);
  }

 async filter(column:string,data: any) {
    // this.queryParams.tableName = column.split(".")[0];
    // this.queryParams.columnName = column.split(".")[1];
    // this.queryParams.optionName = data.target.value;

    const splitParts =column.split(".");
     
    let where = '';
    const innerCond = splitParts[1]?`{${splitParts[1]} : "${data.target.value}"}`:''
    const outerCond = innerCond!=''?`{${splitParts[0]}:${innerCond}}`:`{${splitParts[0]}:"${data.target.value}"}`
     if(this.queryParams.whereCond==''){
      where = `where:${outerCond}`;
     }
    else{
      let whereArray = JSON.parse(this.queryParams.whereCond)
      if(innerCond!='')
      {
        whereArray[splitParts[0]]!==undefined?whereArray[splitParts[0]][splitParts[1]] = data.target.value : whereArray[splitParts[0]]= JSON.parse(innerCond);
      }else{
        whereArray[splitParts[0]]=data.target.value;
      }
      where = JSON.stringify(whereArray);
    }
    this.queryParams.whereCond = where!==''? where:'';
    await this.mainfunction(this.queryParams);
  }
}
