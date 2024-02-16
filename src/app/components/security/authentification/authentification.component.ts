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

  //-------------------------------
  verifEmailCon: any = '';
  verifPasswordCon: any = '';

  // Variables Si les valeurs sont exactes
  exactEmailCon: boolean = false;
  exactPasswordCon: boolean = false;
  //-------------------------------
  //-------------------------------

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
    const token = JSON.parse(localStorage.getItem('TokenUser') || '');
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
      // console.log('veuillez remplir tous les champs');
      this.message.MessageSucces(
        'error',
        'Oups Error',
        'Veuillez remplir tous les champs',
        'center'
      );
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

        // console.log('vous êtes etudiant');
      } else if (this.proprietaireStatus == 'proprietaire') {
        // console.log('vous êtes proprietaire');
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
          this.message.MessageSucces(
            'error',
            'Oups Error',
            'Veuillez remplir tous les champs',
            'center'
          );
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

  onSuccessHandler = (response: any) => {
    this.message.MessageSucces(
      'success',
      'Success',
      'Inscrit avec Succes',
      'center'
    );
    this.changeForme();
    // Autres actions à exécuter après une inscription réussie
  };

  onErrorHandler = (error: any) => {
    // console.error("Erreur lors de l'inscription:", error);
    // console.error("Erreur lors de l'inscription:", error.status);
    // console.error("Erreur lors de l'inscription:", error.error.error);
    this.message.MessageSucces(
      'error',
      'Oups',
      'les informations que vous avez saisi sont incorrect',
      'center'
    );
    // Gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur.
  };

  validateEmail(email: string): boolean {
    const emailRegex =
      /^[A-Za-z]+[A-Za-z0-9\._%+-]+@[A-Za-z][A-Za-z0-9\.-]+\.[A-Za-z]{2,}$/;
    // const endsWithCom = /com$/;

    // return emailRegex.test(email) && endsWithCom.test(email);
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    return password.length >= 8;
  }

  verifEmail() {
    if (this.emailLogin == '') {
      this.verifEmailCon = '';
    } else {
      if (this.validateEmail(this.emailLogin) == true) {
        console.log('true');
        this.exactEmailCon = true;
        this.verifEmailCon = 'le format du mail est valide';
        console.log(this.verifEmailCon);
      }

      if (this.validateEmail(this.emailLogin) == false) {
        console.log('false');
        this.exactEmailCon = false;
        this.verifEmailCon = 'le format du mail est invalide';
        console.log(this.verifEmailCon);
      }
    }
  }

  color: string = 'red';

  verifPassword() {
    if (this.PasswordLogin == '') {
      this.verifPasswordCon = '';
    } else {
      if (this.PasswordLogin.length < 8) {
        this.exactPasswordCon = false;
        this.verifPasswordCon =
          'Le Mot de passe doit être superieur a 8 caractere';
      } else {
        this.exactPasswordCon = true;
        this.verifPasswordCon = 'Mot de Passe Correcte';
      }
    }
  }

  // login() {
  //   if (this.emailLogin == '' || this.PasswordLogin == '') {
  //     this.message.MessageSucces(
  //       'error',
  //       'Oops...',
  //       'veuillez remplir les champs',
  //       'center'
  //     );
  //   } else {
  //     let email = this.emailLogin;
  //     let Password = this.PasswordLogin;

  //     this.AuthService.login(
  //       { email: email, password: Password },
  //       (response: any) => {
  //         console.log('Voici la reponse ', response);
  //         if (response.user.role === 'admin') {
  //           // Gérer la réponse en cas de succès
  //           this.message.MessageSucces(
  //             'success',
  //             'Success',
  //             'Vous êtes connecté avec succès',
  //             'center'
  //           );
  //           this.AuthService.isAuthenticated = true;
  //           localStorage.setItem('userOnline', JSON.stringify(response));
  //           localStorage.setItem(
  //             'Userconnect',
  //             JSON.stringify(this.AuthService.isAuthenticated)
  //           );
  //           this.route.navigate(['/dashboard_statistic']);
  //         } else if (response.user.role === 'etudiant') {
  //           // Gérer la réponse en cas de succès
  //           this.message.MessageSucces(
  //             'success',
  //             'Success',
  //             'Vous êtes connecté avec succès',
  //             'center'
  //           );
  //           this.AuthService.isAuthenticated = true;
  //           localStorage.setItem('userOnline', JSON.stringify(response));
  //           localStorage.setItem(
  //             'Userconnect',
  //             JSON.stringify(this.AuthService.isAuthenticated)
  //           );
  //           this.route.navigate(['/accueil']);
  //         } else if (response.user.role === 'proprietaire') {
  //           // Gérer la réponse en cas de succès
  //           this.message.MessageSucces(
  //             'success',
  //             'Success',
  //             'Vous êtes connecté avec succès',
  //             'center'
  //           );
  //           this.AuthService.isAuthenticated = true;
  //           localStorage.setItem('userOnline', JSON.stringify(response));
  //           localStorage.setItem(
  //             'Userconnect',
  //             JSON.stringify(this.AuthService.isAuthenticated)
  //           );
  //           this.route.navigate(['/accueil']);
  //         }
  //       }
  //     );
  //   }
  // }

  login() {
    if (
      this.validateEmail(this.emailLogin) &&
      this.validatePassword(this.PasswordLogin)
    ) {
      // Effectuer la connexion
      let email = this.emailLogin;
      let Password = this.PasswordLogin;

      this.AuthService.login(
        { email: email, password: Password },
        (response: any) => {
          // console.log('Voici la reponse ', response);
          this.AuthService.deconnexionAutomatique();

          let token = response.authorization.token;
          // console.log('le token du user est :', token);
          localStorage.setItem('TokenUser', JSON.stringify(token));


          if (response.user.role === 'admin') {
            // Gérer la réponse en cas de succès

            this.message.MessageSucces(
              'success',
              'Success',
              'Vous êtes connecté avec succès',
              'center'
            );
            this.AuthService.isAuthenticated = true;
            localStorage.setItem('userOnline', JSON.stringify(response));
            localStorage.setItem(
              'Userconnect',
              JSON.stringify(this.AuthService.isAuthenticated)
            );
            this.route.navigate(['/dashboard_statistic']);
          } else if (response.user.role === 'etudiant') {
            // Gérer la réponse en cas de succès
            this.message.MessageSucces(
              'success',
              'Success',
              'Vous êtes connecté avec succès',
              'center'
            );
            this.AuthService.isAuthenticated = true;
            localStorage.setItem('userOnline', JSON.stringify(response));
            localStorage.setItem(
              'Userconnect',
              JSON.stringify(this.AuthService.isAuthenticated)
            );
            this.route.navigate(['/accueil']);
          } else if (response.user.role === 'proprietaire') {
            // Gérer la réponse en cas de succès
            this.message.MessageSucces(
              'success',
              'Success',
              'Vous êtes connecté avec succès',
              'center'
            );
            this.AuthService.isAuthenticated = true;
            localStorage.setItem('userOnline', JSON.stringify(response));
            localStorage.setItem(
              'Userconnect',
              JSON.stringify(this.AuthService.isAuthenticated)
            );
            this.route.navigate(['/accueil']);
          }
        },
        (error: any) => {
          this.message.MessageSucces(
            'error',
            'Error',
            error.error.message,
            'center'
          );
          // let message = error.error.message;
          // console.log("Voici les messages d'erreur", message);
        }
      );
    } else {
      if (this.emailLogin == '' && this.PasswordLogin == '') {
        this.exactEmailCon = false;
        // this.exactPasswordCon = false;
        this.verifEmailCon = 'Veuilez Saisir le mail ';
        this.verifPasswordCon = 'Veuillez Saisir le mot de Passe';
        this.message.MessageSucces(
          'error',
          'Oops...',
          'Veuillez remplir les champs',
          'center'
        );
      } else {
        if (
          !(
            this.validateEmail(this.emailLogin) &&
            this.validatePassword(this.PasswordLogin)
          )
        ) {
          // Le bloc de code sera exécuté si l'email ou le mot de passe n'est pas valide
          this.message.MessageSucces(
            'error',
            'Oops...',
            "Veuillez saisir le bon format de mail et un mot de passe d'au moins 8 caractères",
            'center'
          );
        }

        if (!this.validateEmail(this.emailLogin)) {
          this.message.MessageSucces(
            'error',
            'Oops...',
            'Veuillez saisir le bon format de mail',
            'center'
          );
        } else if (!this.validatePassword(this.PasswordLogin)) {
          this.message.MessageSucces(
            'error',
            'Oops...',
            "Veuillez saisir un mot de passe d'au moins 8 caractères",
            'center'
          );
        }
      }
    }
  }

  // déconnexion apres 10 secondes
}
