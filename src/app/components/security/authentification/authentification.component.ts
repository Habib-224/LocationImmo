import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { AuthserviceService } from 'src/app/services/serviceauth/authservice.service';
import Swal from 'sweetalert2';
import { Proprietaire } from 'src/app/models/Proprietaire';
import { Etudiant } from 'src/app/models/Etudiant';
import { MessageService } from 'src/app/services/message/message.service';
import iziToast from 'izitoast';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent implements OnInit {
  // Déclarez trois variables distinctes pour représenter l'état de chaque étape
  changeStep1: boolean = true;
  changeStep2: boolean = false;
  changeStep3: boolean = false;

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

  //------------------Variable Verification Inscription------------------------------

  Exactenom: boolean = false;
  Exacteprenom: boolean = false;
  ExacteAdresse: boolean = false;
  ExacteEmail: boolean = false;
  ExactePassword: boolean = false;
  ExacteTelephone: boolean = false;
  ExacteUniversite: boolean = false;
  ExactePaysOrigine: boolean = false;

  verifenom: string = '';
  verifeprenom: string = '';
  verifeAdresse: string = '';
  verifeEmail: string = '';
  verifePassword: string = '';
  verifeTelephone: string = '';
  verifeUniversite: string = '';
  verifePaysOrigine: string = '';

  //------------------Fin Verification Inscription ----------------------------------

  //------------------ Function de verification du formulaire d'inscription---------------
  validerNom(nom: string): boolean {
    const regex = /^[a-zA-Z\s]+$/; // Permet uniquement des lettres et des espaces
    return regex.test(nom);
  }

  validerPrenom(prenom: string): boolean {
    const regex = /^[a-zA-Z\s]+$/; // Permet uniquement des lettres et des espaces
    return regex.test(prenom);
  }

  validerAdresse(adresse: string): boolean {
    const regex = /^\D.*$/; // Vérifie si l'adresse ne commence pas par un chiffre
    return regex.test(adresse.trim());
  }

  validerTelephone(telephone: string): boolean {
    const phoneRegex = /^(77|78|76|70|75|33)[0-9]{7}$/;

    // return telephone.length >= 10;
    return phoneRegex.test(telephone);
  }

  validerUniversite(universite: string): boolean {
    const regex = /^[a-zA-Z\s]+$/; // Permet uniquement des lettres et des espaces
    return regex.test(universite);
  }

  validerPaysOrigine(pays: string): boolean {
    const regex = /^[a-zA-Z\s]+$/; // Permet uniquement des lettres et des espaces
    return regex.test(pays);
  }

  validateEmail(email: string): boolean {
    const emailRegex =
      /^[A-Za-z]+[A-Za-z0-9\._%+-]+@[A-Za-z][A-Za-z0-9\.-]+\.[A-Za-z]{2,}$/;

    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    return password.length >= 8;
  }

  //------------------ Fin de verification du formulaire d'inscription--------------------

  changedirection(direction: string) {
    if (direction === 'suivant') {
      if (this.changeStep1) {
        this.changeStep1 = false;
        this.changeStep2 = true;
        // this.changeStep3 = false;
      } else if (this.changeStep2) {
        this.changeStep2 = false;
        this.changeStep3 = true;
      }
    }

    if (direction === 'retour') {
      if (this.changeStep2) {
        this.changeStep2 = false;
        this.changeStep1 = true;
      } else if (this.changeStep3) {
        this.changeStep3 = false;
        this.changeStep2 = true;
      }
    }
  }

  //------------Debut Validation Connexion-------------------
  verifEmailCon: any = '';
  verifPasswordCon: any = '';

  // Variables Si les valeurs sont exactes
  exactEmailCon: boolean = false;
  exactPasswordCon: boolean = false;
  //-------------Fin Validation Connexion------------------------
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
  papierJustificatif: any;

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

  verifiNom() {
    const nomproprioTrime = this.nomproprio.trim(); // Appliquer trim()

    if (nomproprioTrime === '') {
      this.verifenom = '';
      this.Exactenom = false;
    } else if (
      this.validerNom(nomproprioTrime) &&
      nomproprioTrime.length >= 2
    ) {
      this.Exactenom = true;
      this.verifenom = '';
    } else if (nomproprioTrime.length < 2) {
      this.Exactenom = false;
      this.verifenom = 'au minimum avoir deux caractères ';
    } else {
      this.Exactenom = false;
      this.verifenom = 'le nom est invalide ';
    }
  }

  verifiPrenom() {
    const prenomProprietaireTrime = this.prenomProprietaire.trim(); // Appliquer trim()

    if (prenomProprietaireTrime == '') {
      this.verifeprenom = '';
      this.Exacteprenom = false;
    } else if (
      this.validerPrenom(prenomProprietaireTrime) == true &&
      prenomProprietaireTrime.length >= 2
    ) {
      this.Exacteprenom = true;
      // this.verifeprenom = 'le prenom est valide';
      this.verifeprenom = '';
    } else if (this.nomproprio.length < 2) {
      this.Exacteprenom = false;
      this.verifeprenom = 'au mininum deux caractères alphabétiques';
      // console.log('le nom est invalide');
    } else {
      this.Exacteprenom = false;
      this.verifeprenom = 'le prenom est invalide ';
    }
  }

  verifiAdresse() {
    const adresseProprietaireTrim = this.adresseProprietaire.trim(); // Appliquer trim()
    if (adresseProprietaireTrim == '') {
      this.verifeAdresse = '';
      this.ExacteAdresse = false;
    } else if (
      this.validerAdresse(adresseProprietaireTrim) == true &&
      adresseProprietaireTrim.length >= 2
    ) {
      this.ExacteAdresse = true;
      // this.verifeAdresse = "l'adresse est valide";
      this.verifeAdresse = '';
    } else {
      this.ExacteAdresse = false;
      this.verifeAdresse = "l'adresse est invalide ";
    }
  }

  verifiEmail() {
    if (this.emailProprietaire == '') {
      this.verifEmailCon = '';
    } else {
      if (this.validateEmail(this.emailProprietaire) == true) {
        this.ExacteEmail = true;
        this.verifeEmail = '';
      }

      if (this.validateEmail(this.emailProprietaire) == false) {
        this.ExacteEmail = false;
        this.verifeEmail = 'le format du mail est invalide';
      }
    }
  }

  verifiPassword() {
    if (this.passwordProprietaire == '') {
      this.verifePassword = '';
    } else {
      if (this.passwordProprietaire.length < 8) {
        this.ExactePassword = false;
        this.verifePassword = 'au minimum 8 caracteres';
      } else {
        this.ExactePassword = true;
        this.verifePassword = '';
      }
    }
  }

  verifiTelephone() {
    const telephoneProprietaireTrim = this.telephoneProprietaire.trim(); // Appliquer trim()

    if (telephoneProprietaireTrim == '') {
      this.verifeTelephone = '';
      this.ExacteTelephone = false;
    } else if (
      this.validerTelephone(telephoneProprietaireTrim) == true &&
      telephoneProprietaireTrim.length >= 2
    ) {
      this.ExacteTelephone = true;
      // this.verifeprenom = 'le prenom est valide';
      this.verifeTelephone = '';
    } else if (this.nomproprio.length < 2) {
      this.ExacteTelephone = false;
      this.verifeTelephone = 'au mininum 9 chiffres';
      // console.log('le nom est invalide');
    } else {
      this.ExacteTelephone = false;
      this.verifeTelephone = 'le Numéro de telephone est invalide ';
    }
  }

  verifEmail() {
    if (this.emailLogin == '') {
      this.verifEmailCon = '';
    } else {
      if (this.validateEmail(this.emailLogin) == true) {
        // console.log('true');
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

  verifPasswordlogin() {
    if (this.PasswordLogin == '') {
      this.verifPasswordCon = '';
    } else {
      if (this.PasswordLogin.length < 8) {
        this.exactPasswordCon = false;
        this.verifPasswordCon = 'au minimum 8 caracteres';
      } else {
        this.exactPasswordCon = true;
        this.verifPasswordCon = 'Mot de Passe Correcte';
      }
    }
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
        const formData = new FormData();

        formData.append('nom', this.nomproprio);
        formData.append('prenom', this.prenomProprietaire);
        formData.append('adresse', this.adresseProprietaire);
        formData.append('email', this.emailProprietaire);
        formData.append('password', this.passwordProprietaire);
        formData.append('telephone', this.telephoneProprietaire);
        formData.append('role', this.etudiantStatus);
        formData.append('universite', this.universite);
        formData.append('paysOrigine', this.paysOrigine);
        // formData.append('papierJustificatif',this.);

        // Ajout de l'image
        if (this.papierJustificatif) {
          formData.append('papierJustificatif', this.papierJustificatif);
        }

        // const newEtudiant = new Etudiant();
        // newEtudiant.nom = this.nomproprio;
        // newEtudiant.prenom = this.prenomProprietaire;
        // newEtudiant.adresse = this.adresseProprietaire;
        // newEtudiant.email = this.emailProprietaire;
        // newEtudiant.password = this.passwordProprietaire;
        // newEtudiant.telephone = this.telephoneProprietaire;
        // newEtudiant.role = this.etudiantStatus;
        // newEtudiant.universite = this.universite;
        // newEtudiant.paysOrigine = this.paysOrigine;

        this.AuthService.registerEtudiant(
          formData,
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

        const formData = new FormData();

        formData.append('nom', this.nomproprio);
        formData.append('prenom', this.prenomProprietaire);
        formData.append('adresse', this.adresseProprietaire);
        formData.append('email', this.emailProprietaire);
        formData.append('password', this.passwordProprietaire);
        formData.append('telephone', this.telephoneProprietaire);
        formData.append('role', this.proprietaireStatus);
        // formData.append('papierJustificatif',this.);

        // Ajout de l'image
        if (this.papierJustificatif) {
          formData.append('papierJustificatif', this.papierJustificatif);
        }
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
            formData,
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
    console.log('la reponse', response);
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
    console.log('non valide ', error);
    // Gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur.
  };

  color: string = 'red';

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
            // iziToast.success({
            //   title: 'OK',
            //   message: 'Connecté avec Succès!',
            // });
            // console.log("succes connexion")

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

  // papierJustificatif: any = [];

  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.papierJustificatif = event.target.files[0] as File;
  }

  // déconnexion apres 10 secondes
}
