import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../UrlApi';
import { Observable } from 'rxjs';
import { Logement } from 'src/app/models/Logement';

@Injectable({
  providedIn: 'root',
})
export class LogementService {
  constructor(private http: HttpClient) {}
  getAlllogment(): Observable<any> {
    return this.http.get<any>(`${url}logements`);
  }

  getdetailLogement(id: any): Observable<any> {
    return this.http.get<any>(`${url}detailLogement/${id}`);
  }

  getAllLogementByOwner(): Observable<any> {
    return this.http.get<any>(`${url}logementsProprietaire`);
  }

  ajouterLogement(formData: FormData): Observable<any> {
    // const url = `${url}/votre-endpoint-d-ajout-de-logement`; // Remplacez par l'endpoint de votre API
    return this.http.post(`${url}ajoutLogements`, formData);
  }

  ModifierLogement(formData: FormData, id: number): Observable<any> {
    // const url = `${url}/votre-endpoint-d-ajout-de-logement`; // Remplacez par l'endpoint de votre API
    return this.http.post(`${url}logements/${id}`, formData);
  }

  deleteLogementByOwner(id: number, alert: Logement): Observable<Logement> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<Logement>(`${url}logements/${id}`, { params });
  }
}
