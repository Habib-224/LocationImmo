import { Component } from '@angular/core';
import { Router, Route } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { AuthserviceService } from 'src/app/services/serviceauth/authservice.service';
import Swal from 'sweetalert2';
import { Proprietaire } from 'src/app/models/Proprietaire';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent {
  emailLogin: string = '';
  PasswordLogin: string = '';
  change: boolean = false;

  public changeForme() {
    this.change = !this.change;
  }

  nomproprio: string = '';
  prenomProprietaire: string = '';
  adresseProprietaire: string = '';
  emailProprietaire: string = '';
  passwordProprietaire: string = '';
  telephoneProprietaire: string ='';
  roleProprietaire: string = 'proprietaire';


  constructor(private AuthService: AuthserviceService, private route: Router) {}

  ngOnInit(): void {}

  register() {
    const newproprietaire = new Proprietaire();
    newproprietaire.nom = this.nomproprio;
    newproprietaire.prenom = this.prenomProprietaire;
    newproprietaire.adresse = this.adresseProprietaire;
    newproprietaire.email = this.emailProprietaire;
    newproprietaire.password = this.passwordProprietaire;
    newproprietaire.telephone = this.telephoneProprietaire;
    newproprietaire.role = this.roleProprietaire;

    if ( this.nomproprio == '' || this.prenomProprietaire == '' || this.adresseProprietaire == '' || this.emailProprietaire == '' || this.passwordProprietaire == '') {
      console.log('veuillez remplir tous les champs');
    } else {
      console.log(newproprietaire);
      this.AuthService.register(newproprietaire,this.onSuccessHandler,this.onErrorHandler);
    }
  }

  onSuccessHandler(response: any) {
    console.log('Inscription réussie:', response);
    this.changeForme();
    // Vous pouvez ajouter ici d'autres actions après une inscription réussie, par exemple rediriger l'utilisateur vers une autre page.
  }

  // Fonction appelée en cas d'erreur lors de l'inscription
  onErrorHandler(error: any) {
    console.error("Erreur lors de l'inscription:", error);
    // Gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur.
  }

  login() {
    if (this.emailLogin == '' || this.PasswordLogin == '') {
      console.log('veuillez remplir les champs');
    } else {
      let email = this.emailLogin;
      let Password = this.PasswordLogin;

      this.AuthService.login(
        { email: email, password: Password },
        (reponse: any) => {
          console.log(reponse.user);

          if (reponse.user.role === 'admin') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: true,
            });

            // stocker notre les info de la requete dans notre localstorage
            localStorage.setItem('userOnline', JSON.stringify(reponse));

            //recuperer le userConnecter
            const userOnline = JSON.parse(
              localStorage.getItem('userOnline') || ''
            );
            this.route.navigate(['/dashboard_statistic']);
          } else if (reponse.user.role === 'etudiant') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Bienvenue Connecté avec succès',
              showConfirmButton: true,
            });
            // stocker notre les info de la requete dans notre localstorage
            localStorage.setItem('userOnline', JSON.stringify(reponse));

            //recuperer le userConnecter
            const userOnline = JSON.parse(
              localStorage.getItem('userOnline') || ''
            );
            this.route.navigate(['/accueil']);
            console.log('vous ête etudiant');
          } else if (reponse.user.role === 'proprietaire') {
             Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Bienvenue Connecté avec succès',
               showConfirmButton: true,
             });
             // stocker notre les info de la requete dans notre localstorage
             localStorage.setItem('userOnline', JSON.stringify(reponse));

             //recuperer le userConnecter
             const userOnline = JSON.parse(
               localStorage.getItem('userOnline') || ''
             );
             this.route.navigate(['/accueil']);
          }
        }
      );
    }
  }
}
