import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 
  private apiUrl =`${environment.apiUrl}/app/users`;
  private token = localStorage.getItem("access_token");
  constructor(private http: HttpClient) { }

  async getAllUsers(queryParams : any): Promise<any> {
    var headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    return await this.http.get<any>(this.apiUrl, { params: queryParams,headers: headers })
      .toPromise();
  }
}
