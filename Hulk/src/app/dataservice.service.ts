import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  baseurl: string = "https://localhost:44339/Mcq/getmcq/";
  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
    debugger
    const serviceURL = this.baseurl;
    return this.http.get(serviceURL);
  }

}