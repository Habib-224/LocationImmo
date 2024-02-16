import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { url } from '../UrlApi';
import { Proprietaire } from 'src/app/models/Proprietaire';
import { Observable } from 'rxjs';
// import { Etudiant } from 'src/app/models/etudiant'
import { Etudiant } from 'src/app/models/Etudiant';
import Swal from 'sweetalert2';
import { MessageService } from '../message/message.service';
@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  constructor(
    private http: HttpClient,
    private route: Router,
    message: MessageService
  ) {}

  // userOnline = JSON.parse(localStorage.getItem('TokenUser') || '');

  // useronline: any = JSON.parse(localStorage.getItem('TokenUser') || '');
  // token: any = this.useronline.authorization.token;

  register(proprio: Proprietaire, onSuccess: Function, onError: Function) {
    this.http
      .post<Proprietaire>(`${url}inscriptionProprietaire`, proprio)
      .subscribe(
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

  login(user: any, onSuccess: Function, onError: Function) {
    return this.http.post<any>(`${url}login`, user).subscribe(
      (response: any) => onSuccess(response),
      (error: any) => onError(error)
    );
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

  deconnexionAutomatique() {
    setTimeout(() => {
      this.refreshToken(this.onSucces, this.onError);
      alert('hello');
    }, 10000);
  }

  refreshToken(onSuccess: Function, onError: Function){
    return this.http.post<any>(`${url}refresh`, "").subscribe(
      (response: any) => onSuccess(response),
      (error: any) => onError(error)
    )
  }

  onSucces = (response: any) => {
    const useronline = JSON.parse(localStorage.getItem('userOnline') || '');
    localStorage.setItem('userOnline', JSON.stringify(response));
    console.log('voici la reponse du changement du token', response);


    // const usertoken = JSON.parse(localStorage.getItem('TokenUser') || '');
    // const token = usertoken;
    // localStorage.setItem('TokenUser', JSON.stringify(token));
    // console.log("le token de l'ancien du user ", token);
    // console.log('voici le nouveau token', response.authorization.token);
  };

  onError=(error: any)=> {
    console.log("Voici les erreurs du changement du token", error);
  }

  // refreshToken() {
  //   return this.http.post<any>(`${url}refresh`, {}).subscribe(
  //     (response) => {
  //       alert('Déconnexion automatique réussie:' response);
  //     },
  //     (error) => {
  //       // Gérer les erreurs de l'appel API
  //       console.error('Erreur lors de la déconnexion automatique :', error);
  //     }
  //   );
  // }
}
