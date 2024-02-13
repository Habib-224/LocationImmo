import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/Alert';
import { Etudiant } from 'src/app/models/Etudiant';
import { Localite } from 'src/app/models/Localite';
import { Proprietaire } from 'src/app/models/Proprietaire';
import { AlerteService } from 'src/app/services/alertes/alerte.service';
import { LocaliteService } from 'src/app/services/localites/localite.service';
import { MessageService } from 'src/app/services/message/message.service';
import { AuthserviceService } from 'src/app/services/serviceauth/authservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-espace-personnelle-profil',
  templateUrl: './espace-personnelle-profil.component.html',
  styleUrls: ['./espace-personnelle-profil.component.css'],
})
export class EspacePersonnelleProfilComponent {
  button_show: boolean = true;

  showButton() {
    this.button_show = !this.button_show;
  }

  nom_profil: any = '';
  prenom_profil: any = '';
  adresse_profil: any = '';
  telephone_profil!: any;
  email_profil: any = '';
  password_profil: any = '';
  paysOrigine: any = '';
  universite: any = '';

  role_profil: any = 'etudiant';

  constructor(
    private profilService: AuthserviceService,
    private route: Router,
    private message: MessageService
  ) {}
  UserConnect: any;

  ngOnInit(): void {
    let userOnline = JSON.parse(localStorage.getItem('userOnline') || '');
    this.UserConnect = userOnline.user;
    console.log("voici l'utilisateur connecter", this.UserConnect);
  }

  ChargerInformation() {
    this.nom_profil = this.UserConnect.nom;
    this.prenom_profil = this.UserConnect.prenom;
    this.adresse_profil = this.UserConnect.adresse;
    this.telephone_profil = this.UserConnect.telephone;
    this.email_profil = this.UserConnect.email;
    this.password_profil = this.UserConnect.password;
  }

  viderChamp() {
    this.nom_profil = '';
    this.prenom_profil = '';
    this.adresse_profil = '';
    this.telephone_profil = null;
    this.email_profil = '';
    this.password_profil = '';
    this.universite = "";
    this.paysOrigine = "";
  }

  UpdateProfil() {
    const newEtudiant = new Etudiant();
    newEtudiant.nom = this.nom_profil;
    newEtudiant.prenom = this.prenom_profil;
    newEtudiant.adresse = this.adresse_profil;
    newEtudiant.telephone = this.telephone_profil;
    newEtudiant.email = this.email_profil;
    newEtudiant.password = this.password_profil;
    newEtudiant.paysOrigine = this.paysOrigine;
    newEtudiant.universite = this.universite;
    newEtudiant.role = this.role_profil;
    if (
      this.nom_profil == '' ||
      this.prenom_profil == '' ||
      this.adresse_profil == '' ||
      this.telephone_profil == '' ||
      this.email_profil == '' ||
      this.password_profil == ''
    ) {
      this.message.MessageSucces(
        'error',
        'Oops...',
        'veuillez remplir les champs',
        'center'
      );
    } else {
      this.profilService
        .updateEtudiantProfil(newEtudiant)
        .subscribe((response) => {
          console.log('Information modifer avec succes ');
          this.profilService.login(
            { email: this.email_profil, password: this.password_profil },
            (response: any) => {
              this.profilService.isAuthenticated = true;
              localStorage.setItem('userOnline', JSON.stringify(response));
            },
            (error: any) => {
              console.log("Voici les messages d'erreur",error);
            }
          );
          this.message.MessageSucces(
            'success',
            'Success',
            'Profil Modifier avec Succes',
            'center'
          );
          this.viderChamp();
          // this.route.navigate(['/login']);
        });
    }
  }
}
