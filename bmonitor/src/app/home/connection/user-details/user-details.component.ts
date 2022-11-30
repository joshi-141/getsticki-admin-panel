
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from '../../api/user.service';
import { Notification } from 'src/app/service/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  blockReport: any = {}
  created_at: any;
  lastmessage: any = {};
  matchId: any;
  chat: any = {};
  matchedUser: any = {};
  booleanValue: any;
  imageIds: any = [];
  snapshotParam: any;
  isAvailable: boolean = true;
  value: any = "";
  user: any = {};
  photo: any;
  allphoto: any = [];
  reject: any;
  bioDiscription: any;
  bio: any;
  activeImage: any = 0;
  count: any = 0;
  RejecteDiscription: any;
  pictureRejectId: any;
  text: any;
  currentStatus: any;
  

  relation_status: any = [{ name: 'SINGLE', value: true }, { name: 'IN A RELATION', value: false }]
  profile_status: any = [{ name: 'INCOMPLETE', value: 'INCOMPLETE' }, { name: 'APPROVED', value: 'APPROVED' }, { name: 'REJECTED', value: 'REJECTED' }, { name: 'UNDER REVIEW', value: 'UNDER_REVIEW' }];
  queryParams: any = { whereCond: '', status: '', relation: null, whereForMember: '', bio: '', bio_discription: '', profileId: '', whereId: '', picDescription: null, picStatus: '' ,bioStatus:'',profile_id:''};
  constructor(private route: ActivatedRoute, private userService: UserService, private notificationService: Notification,private router: Router) { }

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
      if (this.reject != 'remove') {
        this.bio = this.user.profile.bio;
      } else {
        this.bio = '';
      }
    }, this.queryParams);
    await this.matchUsers()
    await this.chatFunction()
    await this.blockReportFunction()
  }

  async matchUsers() {
    await this.userService.matchedUsers((data) => {
      if (data.data[0]) {
        if (data.data[0].user1.id != this.queryParams.whereCond) {
          this.matchedUser = data.data[0].user1;
        } else {
          this.matchedUser = data.data[0].user2;
        }
      }
    }, this.queryParams);
  }

  async navigate(id: string) {
    this.queryParams.whereCond = id;
    var that = this;
    await this.userService.getSingleUser((data) => {
      this.user = data.data[0];
      this.allphoto = this.user.profile.photo;
      this.user.profile.photo.forEach(function (arrayItem: any) {
        if (arrayItem.status == 'ACTIVE' && arrayItem.type == 'PRIMARY') {
          that.photo = arrayItem.url;
        }
      });
      if (this.reject != 'remove') {
        this.bio = this.user.profile.bio;
      } else {
        this.bio = '';
      }
    }, this.queryParams);
    this.router.navigate(['./connection/user-details', id]);
    await this.matchUsers()
    await this.chatFunction()
    await this.blockReportFunction()
  }

  async handleSubmit(value: any) {
    this.queryParams.bio = value.bio;
    this.queryParams.status = value.profile
    this.queryParams.relation = value.relationship
    await this.userService.updateUserProfile((data) => {
      if (data.data[0].id) {
        this.notificationService.notification("SUCCESS", "updated successfully", "success")
      } else {
        this.notificationService.notification("ERROR", "error in updating", "error")
      }
      if (value.bio_discription) {
        this.queryParams.bio_discription = value.bio_discription;
        this.queryParams.profileId = data.data[0].id;
        this.userService.bioDescriptionUpdate((bioData) => {
        }, this.queryParams);
      }


    }, this.queryParams);

  }

  cancel(data: any) {
    this.reject = data;
    if (this.reject != 'remove') {
      this.bio = this.user.profile.bio;
    } else {
      this.queryParams.bioStatus = 'REJECTED'
      this.bio = '';
    }
  }
  previous(index: any) {
    this.activeImage = index - 1;
  }

  next(index: any) {
    this.activeImage = index + 1;
  }
  picRejectId(data: any) {
    this.pictureRejectId = data;
  }

  handleRejectedButton(event: any, id: any) {
    this.queryParams.whereId = id;
    this.text = document.getElementById("RejecteDiscription");
    this.queryParams.picDescription = this.text?.value;
    this.queryParams.picStatus = "CANCELED";
    this.userService.photoStatus((data) => {
      this.currentStatus = data.data[0].status;
    }, this.queryParams);
    event.target.setAttribute('data-dismiss', "modal")
  }
  picApproved(id: any) {
    this.queryParams.whereId = id;
    this.queryParams.picStatus = "ACTIVE";
    this.userService.photoStatus((data) => {
      console.log("STATUS", data);
      this.currentStatus = data.data[0].status;
    }, this.queryParams);
  }
  async chatFunction() {
    await this.userService.getChatQuery((data) => {
      this.chat = data.data[0];
      this.created_at = this.chat.conversation1[0].created_at;
      if (this.chat.conversation1[0].member_id1 != this.chat.id) {
        this.matchId = this.chat.conversation1[0].member_id1
      } else {
        this.matchId = this.chat.conversation1[0].member_id2
      }
      this.lastmessage = this.chat.conversation1[0].message[this.chat.conversation1[0].message.length - 1]
    }, this.queryParams);
  }

  async blockReportFunction() {
    await this.userService.getBlockReport((data) => {
      this.blockReport = data.data[0]
    }, this.queryParams);
  }

}
