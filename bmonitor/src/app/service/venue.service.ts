import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  private apiUrl = `${environment.apiUrl}/app/venues`;
  private token = localStorage.getItem("access_token");
  constructor(private http: HttpClient) { }

  async getAllVenue(queryParams: any): Promise<any> {
    var headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    return await this.http.get<any>(this.apiUrl, { params: queryParams, headers: headers })
      .toPromise();
  }

}
