import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { url } from '../UrlApi';
@Injectable({
  providedIn: 'root',
})
  
export class AuthserviceService {
  constructor(private http: HttpClient) {}

  login(user: any, onSuccess: Function) {
    return this.http
      .post(`${url}login`, user)
      .subscribe((reponse: any) => onSuccess(reponse));
  }
}
