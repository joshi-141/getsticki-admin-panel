import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../api/api.service';

@Component({
  selector: 'app-panel-grid',
  templateUrl: './panel-grid.component.html',
  styleUrls: ['./panel-grid.component.css']
})
export class PanelGridComponent implements OnInit {
  @Input() description: string | undefined;
  @Input() group: string | undefined;
  @Input() title: string | undefined;
  @Input() menu: any[] | undefined;
  @Input() header: string | undefined;
  @Input() subheader: string | undefined;
  @Input() options: any[] | undefined;
  @Input() cards: any[] | undefined;
  @Input() type: string | undefined;
  constructor(private readonly api: ApiService) { }
  async ngOnInit() {

  }
  firstLetter(x: string){
    return x.split('')[0];
  }

}
