import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id: string | undefined;
  constructor(private router: Router, private readonly activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: any) => {
      this.id = params['id'];
    });
  }
  loadOverview() {
    this.router.navigate(['./overview'], { relativeTo: this.activateRoute });
  }
}
