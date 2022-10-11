import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-panel-left',
  templateUrl: './panel-left.component.html',
  styleUrls: ['./panel-left.component.css']
})
export class PanelLeftComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() group: string | undefined;
  @Input() options: any[] | undefined;
  @Input() type: string | undefined;
  @Input() menu: any[] | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
