import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../UrlApi';

@Injectable({
  providedIn: 'root'
})
export class AlerteService {

  constructor(private http: HttpClient,) { }

  getAllAlerts(): Observable<any>{
    return this.http.get<any>(`${url}annonces`);
  }
}
