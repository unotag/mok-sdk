import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylesDataService {

  constructor(private http: HttpClient) { }

  getStylesData(baseUrl: string, key: string): Promise<any> {
    const url = `${baseUrl}/api/customer/sdk_config`;
    const headers = new HttpHeaders({
      'Authorization': key,
      'Content-Type': 'application/json'
    });

    return this.http.get(url, { headers }).toPromise()
  }
}




