import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api/api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Output() collapse = new EventEmitter<any>();
  expanded: boolean | undefined;
  sideBarMinimized: boolean | undefined;
  user: any[] | undefined;
  profile: any[] | undefined;
  authentication: any[] | undefined;
  dashboard: any[] | undefined;
  chat: any[] | undefined;
  venue: any[] | undefined;
  states: any;
  menu: any[] | undefined;
  current: any | undefined;
  microservices = [
    { path: 'Sms', url: './microservice/sms' },
    { path:'Venue', url: './microservice/venue' },
    { path:'Notification', url: './microservice/notification'},
    { path:'Search', url: ''},
    { path:'Qrcode', url: ''},
    { path:'Chat', url: ''},
    { path:'Event', url: ''},
    { path:'Reminder', url: ''},
  ];
  constructor(private router: Router, private readonly activateRoute: ActivatedRoute, private readonly api: ApiService) {
    this.sideBarMinimized = false;
    this.states = {
      microservices: { expanded: false },
      user: { expanded: false },
      profile: { expanded: false },
      authentication: { expanded: false },
      dashboard: { expanded: false },
      chat: { expanded: false }
    }
  }

  openClose(service: string, collapsed = undefined) {
    const result: any[] | undefined = this.menu?.map((x) => {
      if (x.name === service && x.name!='Dashboard') {
        x.expanded = collapsed != null ? !collapsed : !x.expanded
        this.current = x;
      } else {
        x.expanded = false;
      }
    });
   // this.router.navigate(['./user'], { relativeTo: this.activateRoute });
  }
  ngOnInit(): void {
    const { user, profile, authentication, dashboard, chat , venue } = this.api.loadMenu();
    this.user = user;
    this.authentication = authentication;
    this.profile = profile;
    this.dashboard = dashboard;
    this.chat = chat;
    this.venue = venue;

    this.buildSidebar();
   /* if (this.collapse) {
      this.collapse.subscribe((v) => {
          this.openClose(this.current.name, v);
      })
    }*/
  }
  buildSidebar() {
    this.menu = [
      { name: 'Dashboard', icon: 'fa fa-podcast',url: './dashboard'},
      { name: 'Users', icon: 'fas fa-user', children: [ { name: 'Allusers' , url: './connection/all-users' }, { name: 'Matches' , url: './connection/matches' }, { name: 'Chats' , url: './connection/chat' },{ name: 'Venues' , url: './connection/venues' },{name: 'Dates', url: './connection/date'},
      { name: 'Blocked & Reported' , url: './connection/blocked-reported' },{ name: 'Feedback' , url: './connection/feedback' },{ name: 'Interest Groups' , url: './connection/interestgroups' }] , expanded: false },
      { name: 'Venues', icon: 'fas fa-cocktail',  children: [{ name: 'All Venues' , url: './venue/all-venues' }, { name: 'Venue Groups' , url: './venue/venue-groups' }]},
      { name: 'Reports', icon: 'fa fa-registered', children: [ { name: 'Releases' , url: './user/releases' }, {name: 'Venue Reports', url: './user/venue-reports'} , {name: 'User Reports', url: './user/user-reports'},  {name: 'Other', url: './user/other'} ] , expanded: false },
      { name: 'Authentication', icon: 'fas fa-lock', children: [ { name: 'Sign In' , url: './authentication/login' }, {name: 'Sign Up', url: './authentication/signup'} ] , expanded: false },
      // { name: 'Chat', icon: 'fas fa-comments', children: [ { name: 'Overview' , url: './chat/overview' }, { name: 'Messages' , url: './chat/messages' }, {name: 'Conversations', url: './chat/conversation'} ] , expanded: false },
      // { name: 'Notification', icon: 'fas fa-bell', children: [ { name: 'Settings' , url: '' }, {name: 'Browse Services', url: ''} ] , expanded: false },
      // { name: 'Date', icon: 'fas fa-burn', children: [ { name: 'Settings' , url: '' }, {name: 'Browse Services', url: ''} ] , expanded: false },
      // { name: 'Microservices', icon: 'fas fa-burn', children: [ { name: 'Overview' , url: './mservice/overview' }, { name: 'Discovery' , url: './mservice/discovery' }] , expanded: false },
      // { name: 'Connections', icon: 'fas fa-link', children: [ { name: 'Overview' , url: './connection/overview' }, { name: 'Chats' , url: './connection/chat' }, {name: 'Dates', url: './connection/date'} ] , expanded: false },
    ]
  }
  selectComponent(url: string) {
    this.router.navigate([url],{ relativeTo: this.activateRoute });
    this.expanded = !this.expanded;
    this.sideBarMinimized = true;
  }
  openLink(url: string){
    console.log('url', url);
    this.router.navigate([url]);
  }
}
