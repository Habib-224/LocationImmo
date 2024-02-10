import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Alert } from 'src/app/models/Alert';
import { AlerteService } from 'src/app/services/alertes/alerte.service';
import { AuthserviceService } from 'src/app/services/serviceauth/authservice.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  budget_alert: any = '';
  description_alert: string = '';
  caracteristique_alert: string = '';

  ngOnInit(): void {
    console.log(this.AuthService.isAuthenticated);
  }



  constructor(
    private alerteservice: AlerteService,
    private AuthService: AuthserviceService,
  ) {}
  RegisterAlert() {
    const alert = new Alert();
    if (
      this.budget_alert === '' ||
      this.description_alert === '' ||
      this.caracteristique_alert === ''
    ) {
      console.log('les champs sont vides');
    } else {
      alert.budget = this.budget_alert;
      alert.description = this.description_alert;
      alert.caracteristiques = this.caracteristique_alert;
      console.log(alert);

      this.alerteservice.registerAlert(
        alert,
        this.onSuccessHandler,
        this.onErrorHandler
      );
    }
  }

  onSuccessHandler(response: any) {
    console.log('Inscription réussie:', response);
    // this.changeForme();
    // this.route.navigate(['/accueil']);
    // Vous pouvez ajouter ici d'autres actions après une inscription réussie, par exemple rediriger l'utilisateur vers une autre page.
  }

  // Fonction appelée en cas d'erreur lors de l'inscription
  onErrorHandler(error: any) {
    console.error("Erreur lors de l'inscription:", error);
    // Gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur.
  }
}
