import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

const BASE_URL = `${environment.apiURL}/api/v1`;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${BASE_URL}${url}`).pipe(
      map((res: any) => res.data)
    );
  }

  public post<T>(url: string, requestObject: any): Observable<T> {
    return this.http.post<T>(`${BASE_URL}${url}`, requestObject);
  }

  public put<T>(url: string, requestObject: any): Observable<T> {
    return this.http.put<T>(`${BASE_URL}${url}`, requestObject);
  }

  public delete<T>(url: string, requestObject: any): Observable<T> {
    const options = {
      body: requestObject
    };
    return this.http.delete<T>(`${BASE_URL}${url}`, options);
  }
}
