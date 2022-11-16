
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from '../../api/user.service';  

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  snapshotParam:any;
  user:any={};
  queryParams: any = { whereCond: '' };
  constructor(private route: ActivatedRoute,private userService: UserService ) { }

 async ngOnInit(){
    this.queryParams.whereCond = this.route.snapshot.paramMap.get("id");
    await this.userService.getSingleUser((data) => {
      this.user = data.data[0]; 
    }, this.queryParams);
    
  }
}
