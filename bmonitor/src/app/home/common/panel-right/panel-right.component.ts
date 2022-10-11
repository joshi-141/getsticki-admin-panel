import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-panel-right',
  templateUrl: './panel-right.component.html',
  styleUrls: ['./panel-right.component.css']
})
export class PanelRightComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() list: any[] | undefined;
  @Input() type: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
