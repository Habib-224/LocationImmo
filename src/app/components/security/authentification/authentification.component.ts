import { Component } from '@angular/core';
import { Router,Route } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { AuthserviceService } from 'src/app/services/serviceauth/authservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent {
  emailLogin: string = '';
  PasswordLogin: string = '';

  constructor(private AuthService: AuthserviceService,private route :Router) {}

  ngOnInit(): void {}

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

          if (reponse.user.role === "admin") {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: true,
            });

            // stocker notre les info de la requete dans notre localstorage
            localStorage.setItem("userOnline", JSON.stringify(reponse));

            //recuperer le userConnecter
            const userOnline = JSON.parse(localStorage.getItem('userOnline') || '');

          } else if (reponse.user.role === "etudiant") {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: true,
              });
            this.route.navigate(['/accueil'])
            console.log("vous ête etudiant")
          }
        }
      );
    }
  }
}
