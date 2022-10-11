import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  profiles: any[] | undefined;
  constructor() {
  }

  ngOnInit(): void {
    this.profiles = [
      'Jimmy denis',
      'Chad',
      'Thahla',
      'John Doe',
      'Jimmy denis',
      'Chad',
      'Thahla',
      'John Doe',
      'Jimmy denis',
      'Chad',
      'Thahla',
      'John Doe'
    ]
  }

}
