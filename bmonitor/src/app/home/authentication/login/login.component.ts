import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { Notification } from 'src/app/service/notification/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  id: string | undefined;
  constructor(
    private router: Router,
    private readonly activateRoute: ActivatedRoute,
    private authService: LoginService,
    private notificationService: Notification
  ) { }
  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: any) => {
      this.id = params['id'];
    });
    let token = localStorage.getItem('access_token');
    if (token) {
      this.router.navigate(['home'])
    }
  }

  loginUser(login: any) {
    this.authService.authUser(login.value)
      .subscribe((data: any) => {
        if (data.access_token) {
          localStorage.setItem('access_token', data.access_token);
          this.router.navigate(['home'])
          // this.notificationService.notification("SUCCESS", "login success", "success")
        }
      },
        (err: any) => {
          this.notificationService.notification("ERROR", err.error.message, 'error')
        });
  }
}
