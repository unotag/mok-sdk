import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { APIResponseItem } from '../types/api-data.props';

@Injectable({
  providedIn: 'root'
})
export class InfiniteScrollService {

  private cancelRequest$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  getInfiniteScrollData(baseUrl: string, key: string, id: string, pageNo: number, pageSize: number): Observable<APIResponseItem[]> {
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());
      
    const options = {
      headers: {
        'Authorization': key,
        'Content-Type': 'application/json'
      },
      params: params
    };

    return this.http.get<APIResponseItem[]>(`${baseUrl}/api/customer/in_app_operation_data?external_player_id=${id}`, options)
      .pipe(
        takeUntil(this.cancelRequest$)
      );
  }

  cancelRequest() {
    this.cancelRequest$.next();
  }
}
