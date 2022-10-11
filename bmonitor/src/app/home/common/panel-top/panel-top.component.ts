import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-panel-top',
  templateUrl: './panel-top.component.html',
  styleUrls: ['./panel-top.component.css']
})
export class PanelTopComponent implements OnInit {
  @Input() list: any[] | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
