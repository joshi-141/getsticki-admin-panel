
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from '../../api/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  matchedUser : any = {};
  booleanValue:any;
  imageIds:any=[];
  snapshotParam: any;
  isAvailable:boolean = true;
  value:any="";
  user: any = {};
  photo: any;
  allphoto: any = [];
  profile_status:any=[{name:"INCOMPLETE",value:"INCOMPLETE"},{name:"APPROVED",value:"APPROVED"},{name:"REJECTED",value:"REJECTED"},{name:"UNDER REVIEW",value:"UNDER_REVIEW"}];
  queryParams: any = { whereCond: '' ,status:'',relation:null};
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  async ngOnInit() {
    this.queryParams.whereCond = this.route.snapshot.paramMap.get("id");
    var that = this;
    await this.userService.getSingleUser((data) => {
      this.user = data.data[0];
      this.allphoto = this.user.profile.photo;
      this.user.profile.photo.forEach(function (arrayItem: any) {
        if (arrayItem.status == 'ACTIVE' && arrayItem.type == 'PRIMARY') {
          that.photo = arrayItem.url;
        }
      });
    }, this.queryParams);
    await this.matchUsers()
  }

  async matchUsers(){
    await this.userService.matchedUsers((data) => {
      if(data.data[0]){
       if(data.data[0].user1.id != this.queryParams.whereCond){
          this.matchedUser = data.data[0].user1;  
       }else{
          this.matchedUser = data.data[0].user2;
       }
      }
    },this.queryParams);
  }
  

  myClickFunction(image:any):void {
    let index = this.imageIds.indexOf(image.id);
    console.log("index",index);
    if(index != -1){
      this.imageIds.splice(index, 1);
    }else{
      this.imageIds.push(image.id);
    }
    console.log("event",this.imageIds);
     this.isAvailable = !this.isAvailable;
     (!this.isAvailable)? this.value = "approved":this.value = "rejected" 
     console.log("value",this.value);
     
  }

 async handleSubmit(value:any){
  this.booleanValue = value.relationship == 'true' ? true : false;
  this.queryParams.status = value.profile
  this.queryParams.relation = this.booleanValue
   await this.userService.updateUserProfile((data) => {
  }, this.queryParams);

  }

}
