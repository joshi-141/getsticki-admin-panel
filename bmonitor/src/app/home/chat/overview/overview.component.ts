import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api/api.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  inbox: any[] | undefined;
  constructor(private readonly api: ApiService) { }

  async ngOnInit() {
    this.inbox = await this.api.loadInbox();
  }

}
