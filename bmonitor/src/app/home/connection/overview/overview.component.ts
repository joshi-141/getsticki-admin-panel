import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api/api.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  inbox: any[] | undefined;
  options: any[] | undefined;
  cards: any[] | undefined;
  constructor(private readonly api: ApiService) { }

  async ngOnInit() {
    this.inbox = await this.api.loadInbox();
    this.options = [
      {name: 'New', number: 12, icon: 'fa fa-user' ,  color: 'icon-primary'},
      {name: 'Active', number: 22,  icon: 'fa fa-comments', color: 'icon-success'  },
      {name: 'Blocked', number: 12,  icon: 'fa fa-ban',  color: 'icon-danger'  },
      {name: 'Pending', number: 12,  icon: 'fa fa-eye',  color: 'icon-secondary'  },
      {name: 'Cancel', number: 12,  icon: 'fa fa-times',  color: 'icon-default'  },

    ];
    this.cards = [
      { name: 'Claudi', bio: 'Hi, This is my short bio This is my short bio....' , color: 'bg-info'},
      { name: 'Jenny', bio: 'Hello, This is my short bio This is my short bio....', color: 'bg-info'  },
      { name: 'Osaka', bio: 'Coucou, This is my short bio...' ,color: 'bg-info'  },
      { name: 'Tokyo', bio: 'Wow, This is my short bio...' ,color: 'bg-secondary'  },
      { name: 'Coco', bio: 'This is my short bio...',color: 'bg-secondary'  },
      { name: 'Lola', bio: 'This is my short bio...',color: 'bg-secondary'   },
      { name: 'Belinda', bio: 'This is my short bio...',color: 'bg-info'   },
      { name: 'Zarra', bio: 'This is my short bio...',color: 'bg-warning'   },
      { name: 'Anna', bio: 'This is my short bio...',color: 'bg-warning'   },
      { name: 'Erick', bio: 'This is my short bio...',color: 'bg-info'   },
      { name: 'Julia', bio: 'This is my short bio...',color: 'bg-warning'   },
      { name: 'Henna', bio: 'This is my short bio...',color: 'bg-warning'   },
    ];
  }

}
