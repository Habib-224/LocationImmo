import { Injectable } from '@angular/core';
import { url } from '../UrlApi';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proprietaire } from 'src/app/models/Proprietaire';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
@Injectable({
  providedIn: 'root',
})
export class UtilisateurserviceService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${url}utilisateurs`);
  }

  getUtilisateurBloque(): Observable<any> {
    return this.http.get<any>(`${url}utilisateursBloques`);
  }

  getEtudiant(): Observable<any> {
    return this.http.get<any>(`${url}etudiants`);
  }

  getProprietaire(): Observable<any> {
    return this.http.get<any>(`${url}proprietaires`);
  }

  archiveUtilisateur(
    id: number,
    utilisateur: Proprietaire
  ): Observable<Proprietaire> {
    return this.http.put<Proprietaire>(`${url}bloquerUser/${id}`, utilisateur);
  }

  desarchiveUtilisateur(
    id: number,
    utilisateur: Proprietaire
  ): Observable<Proprietaire> {
    return this.http.put<Proprietaire>(
      `${url}debloquerUser/${id}`,
      utilisateur
    );
  }

  accepterInscritption(id: any, user: Proprietaire): Observable<any> {
    return this.http.put<any>(`${url}validerInscription/${id}`, Proprietaire);
  }

  rejeterInscritption(id: any, user: Proprietaire): Observable<any> {
    return this.http.put<any>(`${url}rejeterInscription/${id}`, Proprietaire);
  }

  InscriptionNewsletter(user: Proprietaire, onSuccess: Function, onError: Function){
    return this.http.post<Proprietaire>(`${url}newsletter`, user).subscribe(
      (response: any) => onSuccess(response),
      (error:any)=>onError(error)
    );
  }
}
