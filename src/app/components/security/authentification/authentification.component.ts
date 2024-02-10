import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { AuthserviceService } from 'src/app/services/serviceauth/authservice.service';
import Swal from 'sweetalert2';
import { Proprietaire } from 'src/app/models/Proprietaire';
import { Etudiant } from 'src/app/models/Etudiant';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent implements OnInit {
  emailLogin: string = '';
  PasswordLogin: string = '';
  change: boolean = false;

  userRole: boolean = false;

  ChangeRole() {
    this.userRole = !this.userRole;
  }

  ChangeRoleProprio() {
    this.userRole = false;
  }

  etudiant: any = '';
  proprietaire: any = '';

  public changeForme() {
    this.change = !this.change;
  }

  nomproprio: string = '';
  prenomProprietaire: string = '';
  adresseProprietaire: string = '';
  emailProprietaire: string = '';
  passwordProprietaire: string = '';
  telephoneProprietaire: string = '';
  paysOrigine: string = '';
  universite: string = '';
  roleProprietaire: string = '';
  etudiantStatus: any = '';
  proprietaireStatus: any = '';

  constructor(
    private AuthService: AuthserviceService,
    private route: Router,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    const userOnline = JSON.parse(localStorage.getItem('userOnline') || '');
    const userconnect = JSON.parse(localStorage.getItem('Userconnect') || '');
  }

  checkbox1Checked: boolean = false;
  checkbox2Checked: boolean = false;

  checkOne(event: any) {
    this.checkbox1Checked = event.target.checked;
    if (this.checkbox1Checked) {
      this.etudiantStatus = 'etudiant';
      this.proprietaireStatus = '';
      this.checkbox2Checked = false;
    }
  }

  checkTwo(event: any) {
    this.checkbox2Checked = event.target.checked;
    if (this.checkbox2Checked) {
      this.proprietaireStatus = 'proprietaire';
      this.etudiantStatus = '';
      this.checkbox1Checked = false;
    }
  }

  register() {
    if (
      this.nomproprio == '' ||
      this.prenomProprietaire == '' ||
      this.adresseProprietaire == '' ||
      this.emailProprietaire == '' ||
      this.passwordProprietaire == ''
    ) {
      console.log('veuillez remplir tous les champs');
    } else {
      if (this.etudiantStatus == 'etudiant') {
        const newEtudiant = new Etudiant();
        newEtudiant.nom = this.nomproprio;
        newEtudiant.prenom = this.prenomProprietaire;
        newEtudiant.adresse = this.adresseProprietaire;
        newEtudiant.email = this.emailProprietaire;
        newEtudiant.password = this.passwordProprietaire;
        newEtudiant.telephone = this.telephoneProprietaire;
        newEtudiant.role = this.etudiantStatus;
        newEtudiant.universite = this.universite;
        newEtudiant.paysOrigine = this.paysOrigine;

        this.AuthService.registerEtudiant(
          newEtudiant,
          this.onSuccessHandler,
          this.onErrorHandler
        );

        console.log('vous êtes etudiant');
      } else if (this.proprietaireStatus == 'proprietaire') {
        console.log('vous êtes proprietaire');
        const newproprietaire = new Proprietaire();
        newproprietaire.nom = this.nomproprio;
        newproprietaire.prenom = this.prenomProprietaire;
        newproprietaire.adresse = this.adresseProprietaire;
        newproprietaire.email = this.emailProprietaire;
        newproprietaire.password = this.passwordProprietaire;
        newproprietaire.telephone = this.telephoneProprietaire;
        newproprietaire.role = this.proprietaireStatus;
        if (
          this.nomproprio == '' ||
          this.prenomProprietaire == '' ||
          this.adresseProprietaire == '' ||
          this.emailProprietaire == '' ||
          this.passwordProprietaire == ''
        ) {
          console.log('veuillez remplir tous les champs');
        } else {
          // console.log(newproprietaire);
          this.AuthService.register(
            newproprietaire,
            this.onSuccessHandler,
            this.onErrorHandler
          );
        }
      }
    }
  }

  onSuccessHandler(response: any) {
    console.log('Inscription réussie:', response);
    // this.changeForme();
    this.route.navigate(['/']);
    // Vous pouvez ajouter ici d'autres actions après une inscription réussie, par exemple rediriger l'utilisateur vers une autre page.
  }

  // Fonction appelée en cas d'erreur lors de l'inscription
  onErrorHandler(error: any) {
    console.error("Erreur lors de l'inscription:", error);

    // Gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur.
  }

  login() {
    if (this.emailLogin == '' || this.PasswordLogin == '') {
      // console.log('veuillez remplir les champs');
      this.message.MessageSucces(
        'error',
        'Oops...',
        'veuillez remplir les champs',
        'center'
      );
    } else {
      let email = this.emailLogin;
      let Password = this.PasswordLogin;

      this.AuthService.login(
        { email: email, password: Password },
        (reponse: any) => {
          if (reponse.user.role === 'admin') {
            this.message.MessageSucces(
              'success',
              'Success',
              'Vous ête Connecté avec Succes',
              'center'
            );

            this.AuthService.isAuthenticated = true;
            localStorage.setItem('userOnline', JSON.stringify(reponse));
            localStorage.setItem(
              'Userconnect',
              JSON.stringify(this.AuthService.isAuthenticated)
            );

            //recuperer le userConnecter
            const userOnline = JSON.parse(
              localStorage.getItem('userOnline') || ''
            );
            const userconnect1 = JSON.parse(
              localStorage.getItem('Userconnect') || ''
            );
            this.route.navigate(['/dashboard_statistic']);
          } else if (reponse.user.role === 'etudiant') {
            this.message.MessageSucces(
              'success',
              'Success',
              'Vous ête Connecté avec Succes',
              'center'
            );
            this.AuthService.isAuthenticated = true;

            // stocker notre les info de la requete dans notre localstorage
            localStorage.setItem('userOnline', JSON.stringify(reponse));
            localStorage.setItem(
              'Userconnect',
              JSON.stringify(this.AuthService.isAuthenticated)
            );

            //recuperer le userConnecter
            const userOnline = JSON.parse(
              localStorage.getItem('userOnline') || ''
            );

            const userconnect1 = JSON.parse(
              localStorage.getItem('Userconnect') || ''
            );
            // console.log("voici le status du user connecter",userconnect1);
            this.route.navigate(['/accueil']);
            // console.log('vous ête etudiant');
          } else if (reponse.user.role === 'proprietaire') {
            this.message.MessageSucces(
              'success',
              'Success',
              'Vous ête Connecté avec Succes',
              'center'
            );
            this.AuthService.isAuthenticated = true;

            // stocker notre les info de la requete dans notre localstorage
            localStorage.setItem('userOnline', JSON.stringify(reponse));
            localStorage.setItem(
              'Userconnect',
              JSON.stringify(this.AuthService.isAuthenticated)
            );

            //recuperer le userConnecter
            const userOnline = JSON.parse(
              localStorage.getItem('userOnline') || ''
            );
            const userconnect1 = JSON.parse(
              localStorage.getItem('Userconnect') || ''
            );

            this.route.navigate(['/accueil']);
          }
        }
      );
    }
  }
}
