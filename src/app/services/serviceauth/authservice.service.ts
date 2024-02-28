import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { url } from '../UrlApi';
import { Proprietaire } from 'src/app/models/Proprietaire';
import { Observable } from 'rxjs';
// import { Etudiant } from 'src/app/models/etudiant'
import { Etudiant } from 'src/app/models/Etudiant';
// import Swal from 'sweetalert2';
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

  register(formData: FormData, onSuccess: Function, onError: Function) {
    this.http
      .post<Proprietaire>(`${url}inscriptionProprietaire`, formData)
      .subscribe(
        (response: any) => onSuccess(response),
        (error: any) => onError(error)
      );
  }

  registerEtudiant(formData: FormData, onSuccess: Function, onError: Function) {
    return this.http
      .post<Etudiant>(`${url}inscriptionEtudiant`, formData)
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
      this.refreshToken(this.onSuccess, this.onError);
    },900000); // 15 minutes 900000
  }

  refreshToken(onSuccess: Function, onError: Function) {
    // Vérifier si le nombre de rafraîchissements a atteint la limite de 4
    const refreshCount = parseInt(
      localStorage.getItem('refreshCount') || '0',
      10
    );
    if (refreshCount >= 4) {
      // Afficher SweetAlert pour proposer de rafraîchir le token ou se déconnecter
      this.showLogoutAlert();
    } else {
      // Mettre à jour le nombre de rafraîchissements dans le localStorage
      localStorage.setItem('refreshCount', (refreshCount + 1).toString());
      // Réinitialiser le timer de déconnexion automatique
      this.deconnexionAutomatique();
    }

    // Effectuer le rafraîchissement du token
    return this.http.post<any>(`${url}refresh`, '').subscribe(
      (response: any) => onSuccess(response),
      (error: any) => onError(error)
    );
  }

  onSuccess = (response: any) => {
    // Mettre à jour le token
    localStorage.setItem('userOnline', JSON.stringify(response));
    console.log('voici la reponse du changement du token', response);
  };

  onError = (error: any) => {
    console.log('Voici les erreurs du changement du token', error);
  };

  showLogoutAlert() {
    let refresh = 0;
    localStorage.setItem('refreshCount', JSON.stringify(refresh));
    this.logoutuser();

    // this.MessageSucces()
    Swal.fire({
      title: 'Votre Session a expirer',
      text: 'Deconnecter vous ou rafraichissez votre token',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui! je raffraichie',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'non!',
          text: 'non!, je me deconnecte',
          icon: 'success',
        });
      }
    });
  }

  logoutuser() {
    this.isAuthenticated = false;
    localStorage.setItem('Userconnect', JSON.stringify(this.isAuthenticated));
    this.logout().subscribe((response) => {
      console.log(response);
      this.isAuthenticated = false;
      localStorage.setItem('Userconnect', JSON.stringify(this.isAuthenticated));
      // this.affichestatut();
      this.route.navigate(['/login']);
    });
  }
}
