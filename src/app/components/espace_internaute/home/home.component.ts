import { Component, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Alert } from 'src/app/models/Alert';
import { Proprietaire } from 'src/app/models/Proprietaire';
import { AlerteService } from 'src/app/services/alertes/alerte.service';
import { MessageService } from 'src/app/services/message/message.service';
import { AuthserviceService } from 'src/app/services/serviceauth/authservice.service';
import { UtilisateurserviceService } from 'src/app/services/utilisateur/utilisateurservice.service';
import { Notify, Loading } from 'notiflix';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  budget_alert: any = '';
  description_alert: string = '';
  caracteristique_alert: string = '';
  useronline_role: any = '';
  userStatut: any = '';

  //Annonce logement
  proprioEtudiant: boolean = true;

  // public changeProprio() {
  //   this.proprioEtudiant = !this.proprioEtudiant;
  // }

  ngOnInit(): void {
    // console.log(this.AuthService.isAuthenticated);
    const userOnline = JSON.parse(localStorage.getItem('userOnline') || '');
    this.userStatut = JSON.parse(localStorage.getItem('Userconnect') || '');
    console.log('statut du user', this.userStatut);
    this.useronline_role = userOnline.user.role;

    console.log('utilisateur connecte', this.useronline_role);

    this.verifechange();
  }

  exacteBudget: boolean = false;
  exacteDescription: boolean = false;
  exacteCaracteristique: boolean = false;

  verifeBudget: any = '';
  verifeDescription: any = '';
  verifeCaracteristique: any = '';
  validateBudget(nombre: any) {
    const regex = /^\d+$/;
    return regex.test(nombre);
  }

  validationBudget() {
    if (this.budget_alert == '') {
      this.exacteBudget = false;
      this.verifeBudget = '';
    } else if (
      this.budget_alert != '' &&
      this.validateBudget(this.budget_alert) == true
    ) {
      this.exacteBudget = true;
      this.verifeBudget = '';
    } else {
      this.exacteBudget = false;
      this.verifeBudget = 'Incorrect';
    }
  }
  verifechange() {
    if (this.useronline_role === 'proprietaire' || this.userStatut === false) {
      this.proprioEtudiant = true;
      console.log('vous etes proprietaire');
    } else if (
      this.useronline_role === 'etudiant' ||
      this.userStatut === false
    ) {
      this.proprioEtudiant = false;
      console.log('vous etes etudiant');
    }
  }

  constructor(
    private alerteservice: AlerteService,
    private AuthService: AuthserviceService,
    private route: Router,
    private message: MessageService,
    private utilisateurService: UtilisateurserviceService
  ) {}

  // RedirectConnect() {
  //   if (this.userStatut === false) {
  //     this.route.navigate(['/login']);
  //   } else {
  //     this.route.navigate(['/publier_Annonce']);
  //   }
  // }

  AnnonceProprio() {
    if (this.useronline_role === 'proprietaire' && this.userStatut === true) {
      this.route.navigate(['/publier_Annonce']);
    } else if (
      this.useronline_role === 'etudiant' &&
      this.userStatut === true
    ) {
      this.route.navigate(['/louer']);
    } else {
      this.route.navigate(['/login']);
    }
  }

  RegisterAlert() {
    Loading.dots();

    const alert = new Alert();
    if (
      this.budget_alert === '' ||
      this.description_alert === '' ||
      this.caracteristique_alert === ''
    ) {
      Notify.failure('Les Champs Sont vides');
      // Loading.remove();
    } else {
      alert.budget = this.budget_alert;
      alert.description = this.description_alert;
      alert.caracteristiques = this.caracteristique_alert;
      // console.log(alert);

      this.alerteservice.registerAlert(
        alert,
        this.onSuccessHandler,
        this.onErrorHandler
      );
      // Loading.remove();
    }
  }

  onSuccessHandler = (response: any) => {
    Notify.success('Annonce ajouté avec Succès');
    this.budget_alert = '';
    this.description_alert = '';
    this.caracteristique_alert = '';
    Loading.remove();

    this.route.navigate(['/alert']);
    // Vous pouvez ajouter ici d'autres actions après une inscription réussie, par exemple rediriger l'utilisateur vers une autre page.
  };

  // Fonction appelée en cas d'erreur lors de l'inscription
  messageError: any = '';
  onErrorHandler = (error: any) => {
    let message1 = error.error.error.email[0];
    this.messageError = message1;
    Notify.failure("Erreur l'ors de l'ajout");
    Loading.remove();
  };

  exacteEmail: boolean = false;
  verifyEmail: any = '';
  emailProprietaire: any;

  validateEmail(email: string): boolean {
    const emailRegex =
      /^[A-Za-z]+[A-Za-z0-9\._%+-]+@[A-Za-z][A-Za-z0-9\.-]+\.[A-Za-z]{2,}$/;

    return emailRegex.test(email);
  }

  verifiEmail() {
    if (this.emailProprietaire == '') {
      this.verifyEmail = '';
      this.exacteEmail = false;
    } else {
      if (this.validateEmail(this.emailProprietaire) == true) {
        this.exacteEmail = true;
        this.verifyEmail = '';
      }

      if (this.validateEmail(this.emailProprietaire) == false) {
        this.exacteEmail = false;
        this.verifyEmail = 'le format du mail saisi est invalide';
      }
    }
  }

  InscriptionNewsletter() {
    const proprietaire = new Proprietaire();
    proprietaire.email = this.emailProprietaire;
    this.utilisateurService.InscriptionNewsletter(
      proprietaire,
      this.onSuccessHandler1,
      this.onErrorHandler1
    );
  }

  onSuccessHandler1 = (response: any) => {
    Notify.success('Vous êtes inscrit a notre Newsletter');
    Loading.remove();

    // this.route.navigate(['/alert']);
    // Vous pouvez ajouter ici d'autres actions après une inscription réussie, par exemple rediriger l'utilisateur vers une autre page.
  };

  // Fonction appelée en cas d'erreur lors de l'inscription
  messageError1: any = '';
  onErrorHandler1 = (error: any) => {
    let message1 = error.error.error.email[0];
    this.messageError1 = message1;
    Notify.failure("Erreur l'ors de l'inscription");
    Notify.failure(message1);

    Loading.remove();
  };
}
