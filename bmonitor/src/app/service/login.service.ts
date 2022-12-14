import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl =`${environment.apiUrl}/auth/login`;
  private authToken: any = "";
  constructor(private http: HttpClient, private router: Router) { }

  authUser(user: any) {
    this.authToken = this.http.post<any>(this.apiUrl, user);
    return this.authToken;
  }

  isLoggedIn() {
    let getAuthToken = localStorage.getItem("access_token");
    if (getAuthToken || this.authToken) {
      return true;
    } else {
      return false;
    }
  }

}


