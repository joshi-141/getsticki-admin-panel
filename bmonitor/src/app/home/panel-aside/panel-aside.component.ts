import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api/api.service';

@Component({
  selector: 'app-panel-aside',
  templateUrl: './panel-aside.component.html',
  styleUrls: ['./panel-aside.component.css']
})
export class PanelAsideComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() menu: any[] | undefined;
  @Input() header: string | undefined;
  @Input() subheader: string | undefined;
  cards: any[] | undefined;
  constructor(private readonly api: ApiService) {     console.log("test",this.menu);}

  async ngOnInit() {
    this.cards = [
      'Claudi', 'Hector', 'Beatrice', 'Rolland', 'Alane', 'Isabella', 'Holland', 'Jenny'
    ]

    
  }
  firstLetter(x: string){
    return x.split('')[0];
  }

}
