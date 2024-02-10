import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../UrlApi';
import { Localite } from 'src/app/models/Localite';

@Injectable({
  providedIn: 'root',
})
export class LocaliteService {
  constructor(private http: HttpClient) {}
  getAllLocalites(): Observable<any> {
    return this.http.get<any>(`${url}localites`);
  }

  addLocalites(localite: Localite): Observable<Localite>{
    return this.http.post<Localite>(`${url}ajoutLocalites`,localite);
  }

  deleteLocalite(id: number,local: Localite): Observable<Localite> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<Localite>(`${url}localites/${id}`, { params });
  }

  updateLocalite(id: number, localite: Localite): Observable<Localite>{
    return this.http.put<Localite>(`${url}localites/${id}`, localite);
  }

}
