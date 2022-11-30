import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../api/user.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  formula: string = "All_users";
  searchValue: any;
  id: any;
  i: number = 0;
  show: boolean = false;
  endofPage: boolean = false;
  users: any = [];
  decs: any = [];
  countOfRows : any = [];
  queryParams: any = {
    skip: 0, take: 10, orderBy: '', orderMethod: '', whereCond: '', whereCondOr: '',
    profile: null, whereForRelation: ''
  };
  public whereQuery: any;
  public display: number = 1;
  // text: string = '';
  // options = ['New South Wales', 'CiVictoriaty', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania'];
  // stateList = this.options;
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
  openLink(id: string) {
    this.router.navigate(['./connection/user-details', id]);
  }
  async mainfunction(queryParams: any) {

    await this.userService.loadUser((data) => {
      this.users = Object.values(data.data);
    }, queryParams);

    await this.userService.totalRows((data) => {
      this.countOfRows = data.data[0].count;
     },queryParams);
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

  async filter(column: string, data: any) {

    const splitParts = column.split(".");
    let where = {}
    if (data.target.value != '') {

      const innerCond = splitParts[1] ? { [splitParts[1]]: data.target.value } : ''
      const outerCond = innerCond != '' ? { [splitParts[0]]: innerCond } : { [splitParts[0]]: data.target.value }
      if (this.queryParams.whereCond == '') {
        where = outerCond;
      }
      else {
        let whereArray = this.queryParams.whereCond
        if (innerCond != '') {
          whereArray[splitParts[0]] !== undefined ? whereArray[splitParts[0]][splitParts[1]] = data.target.value : whereArray[splitParts[0]] = innerCond;
        } else {
          whereArray[splitParts[0]] = data.target.value;
        }
        where = whereArray;
      }
    } else {
      let whereArray = this.queryParams.whereCond;
      if (whereArray[splitParts[0]]) {
        typeof whereArray[splitParts[0]] === 'object' && Object.keys(splitParts[0]).length > 1 ?
          delete whereArray[splitParts[0]][splitParts[1]]
          : delete whereArray[splitParts[0]]
        where = whereArray;
      }
    }
    this.queryParams.whereCond = where !== '' ? where : '';
    await this.mainfunction(this.queryParams);
  }

  async searchText(value: any) {
    // if(value != ''){
    // this.searchValue = value;
    // }else{
    //   delete this.searchValue;
    // }
    if (value != "") {
      this.queryParams.whereCondOr = [{ phone_number: { equals: value, mode: 'insensitive' } }, { email: { equals: value, mode: 'insensitive' } }, { id: { equals: value, mode: 'insensitive' } }, { profile: { first_name: { contains: value, mode: 'insensitive' } } }]
    } else {
      delete this.queryParams.whereCondOr;
    }
    await this.mainfunction(this.queryParams);
  }
  //  async searchFilter(data:any){
  //     console.log('search', data.target.value);
  //     console.log("value",this.searchValue);
  //     this.filter(data.target.value,this.searchValue)
  // }

  downloadCSV() {
    var options = {
      title: 'User Details',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      headers: ['ID', 'USER NAME', 'GENDER', 'PREFERENCE', 'DOB', 'LOCATION', 'MOBILE', 'JOINED DATE', 'PROFILE STATUS', 'ACCOUNT STATUS']
    };
    let userList = new Array();
    if (this.users != '') {
      this.users.forEach(function (arrayItem: any) {

        let userObj = {
          id: arrayItem.id, name: arrayItem.profile.first_name, gender: arrayItem.profile.gender,
          performance: arrayItem.profile.preference[0]?.gender_preference, date_of_birth: arrayItem.profile.date_of_birth,
          location: arrayItem.profile.country, phone_number: arrayItem.phone_number, created_at: arrayItem.created_at,
          profile_status: arrayItem.profile.review_status, account_status: arrayItem.account_status
        }
        userList.push(userObj)
      });
    }
    new Angular2Csv(userList, this.formula, options);
  }

  async filterforRelationship(data: any) {
    this.queryParams.whereForRelation = data.target.value != '' ? data.target.value == 'true' ? `where:{profile:{relationship:true}}` : `where:{profile:{OR:[{relationship:false},{relationship:null}]}}` : '';
    await this.userService.getRelationShipFilter((data) => {
      this.users = Object.values(data.data);
    }, this.queryParams);
  }
}