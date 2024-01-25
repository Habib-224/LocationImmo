import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { url } from '../UrlApi';
import { Proprietaire } from 'src/app/models/Proprietaire';
@Injectable({
  providedIn: 'root',
})

export class AuthserviceService {
  constructor(private http: HttpClient) {}

  register(proprio: Proprietaire, onSuccess: Function) {
    this.http
      .post(`${url}inscriptionProprietaire`, proprio)
      .subscribe((reponse: any) => onSuccess(reponse));
  }

  login(user: any, onSuccess: Function) {
    return this.http
      .post(`${url}login`, user)
      .subscribe((reponse: any) => onSuccess(reponse));
  }
}
