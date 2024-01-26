import { Injectable } from '@angular/core';
import { url } from '../UrlApi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UtilisateurserviceService {
  constructor(private http:HttpClient) { }

  getAllUsers():Observable<any> {
    return this.http.get<any>(`${url}utilisateurs`);
  }
}
