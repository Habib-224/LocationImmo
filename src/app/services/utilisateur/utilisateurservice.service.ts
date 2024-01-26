import { Injectable } from '@angular/core';
import { url } from '../UrlApi';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UtilisateurserviceService {
  constructor(private http:HttpClient) { }

  getAllUsers() {
    return this.http.get(`${url}utilisateurs`);
  }
}
