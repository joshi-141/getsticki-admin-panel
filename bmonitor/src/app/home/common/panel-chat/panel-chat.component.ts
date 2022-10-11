import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-panel-chat',
  templateUrl: './panel-chat.component.html',
  styleUrls: ['./panel-chat.component.css']
})
export class PanelChatComponent implements OnInit {
  @Input() list: any[] | undefined;
  rooms:any [] | undefined;
  constructor() { }

  ngOnInit(): void {
    this.rooms = [
      1,2,3,4,5,6,7,8,9
    ]
  }

}
