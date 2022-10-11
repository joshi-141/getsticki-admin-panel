import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api/api.service';


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  list: any[] | undefined;
  constructor(private readonly api: ApiService) { }

  async ngOnInit() {
    this.list = await this.api.loadTopPanel();
  }

}
