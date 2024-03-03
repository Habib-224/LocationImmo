import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Loading, Notify } from 'notiflix';
import { Proprietaire } from 'src/app/models/Proprietaire';
import { MessageService } from 'src/app/services/message/message.service';
import { AuthserviceService } from 'src/app/services/serviceauth/authservice.service';

@Component({
  selector: 'app-proprio-profil',
  templateUrl: './proprio-profil.component.html',
  styleUrls: ['./proprio-profil.component.css'],
})
export class ProprioProfilComponent implements OnInit {
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
  role_profil: any = 'proprietaire';

  constructor(
    private profilService: AuthserviceService,
    private route: Router,
    private message: MessageService,
    private autservice: AuthserviceService
  ) {}
  UserConnect: any;

  ngOnInit(): void {
    let userOnline = JSON.parse(localStorage.getItem('userOnline') || '');
    this.UserConnect = userOnline.user;

    this.chargerinfo();
    // console.log("voici l'utilisateur connecter", this.UserConnect);
  }

  chargerinfo() {
    let userOnline = JSON.parse(localStorage.getItem('userOnline') || '');
    this.UserConnect = userOnline.user;
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
  }

  UpdateProfil() {
    Loading.dots();
    const newProprio = new Proprietaire();
    newProprio.nom = this.nom_profil;
    newProprio.prenom = this.prenom_profil;
    newProprio.adresse = this.adresse_profil;
    newProprio.telephone = this.telephone_profil;
    newProprio.email = this.email_profil;
    newProprio.password = this.password_profil;
    newProprio.role = this.role_profil;

    if (
      this.nom_profil == '' ||
      this.prenom_profil == '' ||
      this.adresse_profil == '' ||
      this.telephone_profil == '' ||
      this.email_profil == '' ||
      this.password_profil == ''
    ) {
      Notify.failure('Veuillez remplir les champs');
      Loading.remove();
      // this.message.MessageSucces(
      //   'error',
      //   'Oops...',
      //   'veuillez remplir les champs',
      //   'center'
      // );
    } else {
      this.profilService
        .updateProprioProfil(newProprio)
        .subscribe((response) => {
          // this.message.MessageSucces(
          //   'success',
          //   'Success',
          //   'Localite Modifier avec Succes',
          //   'center'
          // );
          this.autservice.login(
            { email: this.email_profil, password: this.password_profil },
            (response: any) => {
              Notify.success('Profil modifé');

              this.autservice.isAuthenticated = true;
              localStorage.setItem('userOnline', JSON.stringify(response));
              Loading.remove();
              window.location.reload();
            },
            (error: any) => {
              Notify.failure("Erreur l'ors de la modification");
              // this.message.MessageSucces('Error',"Error",error.error.message,'center')
              let message = error.HttpErrorResponse.error.message;
              console.log("Voici les messages d'erreur", message);
              Loading.remove();
            }
          );

          // console.log('Information modifer avec succes ');
          this.viderChamp();
          Loading.remove();
          // this.route.navigate(['/login']);
        });
    }
  }

  onsucessHandler() {
    console.log('connecter avec succes');
  }
}
