import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { url } from '../UrlApi';
import { Proprietaire } from 'src/app/models/Proprietaire';
import { Observable } from 'rxjs';
// import { Etudiant } from 'src/app/models/etudiant'
import { Etudiant } from 'src/app/models/Etudiant';
@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  constructor(private http: HttpClient) {}

  register(proprio: Proprietaire, onSuccess: Function, onError: Function) {
    this.http.post(`${url}inscriptionProprietaire`, proprio).subscribe(
      (response: any) => onSuccess(response),
      (error: any) => onError(error)
    );
  }

  registerEtudiant(etudiant: Etudiant, onSuccess: Function, onError: Function) {
    return this.http
      .post<Etudiant>(`${url}inscriptionEtudiant`, etudiant)
      .subscribe(
        (response: any) => onSuccess(response),
        (error: any) => onError(error)
      );
  }

  login(user: any, onSuccess: Function) {
    return this.http
      .post(`${url}login`, user)
      .subscribe((reponse: any) => onSuccess(reponse));
  }

  logout(): Observable<any> {
    return this.http.post(`${url}logout`, {});
  }

  isAuthenticated = false;

  updateProprioProfil(profil: Proprietaire) {
    return this.http.put<Proprietaire>(`${url}updateProprietaire`, profil);
  }

  updateEtudiantProfil(profil: Etudiant) {
    return this.http.put<Etudiant>(`${url}updateEtudiant`, profil);
  }
}
// register(proprio: Proprietaire, onSuccess: Function) {
//   this.http
//     .post(`${url}inscriptionProprietaire`, proprio)
//     .subscribe((reponse: any) => onSuccess(reponse));
// }
