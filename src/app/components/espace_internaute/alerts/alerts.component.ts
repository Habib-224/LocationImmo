import { Component, OnInit } from '@angular/core';
import { AlerteService } from 'src/app/services/alertes/alerte.service';
import { WhatsAppService } from 'src/app/services/whatsApp/whats-app.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements OnInit {
  constructor(private alertService: AlerteService, private WhatsApp: WhatsAppService) {}

  listAlert: any[] = [];
  selectedPrice: any;
  filteredAlerts: any[] = [];
  allAlert: any[] = [];

  etudiant: any;

  ngOnInit(): void {
    this.getAllAlert();
    this.etudiant = JSON.parse(localStorage.getItem('etudiant') || '');
    console.log('liste des etudiants', this.etudiant[0].user.prenom);
  }

  getAllAlert() {
    this.alertService.getAllAlerts().subscribe((response) => {
      this.listAlert = response.data;
      // console.log(this.listAlert);
      this.allAlert = this.listAlert;
      this.filteredAlerts = this.allAlert; // Initialisation de filteredAlerts
    });
  }

  userNom: any;
  userFound: any;
  userNumberfound: any;
  alertFound: any;
  detailAlert(id: any) {
    // alert(id);
    const foundAlert = this.listAlert.find((alert) => alert.id === id);
    if (foundAlert) {
      console.log(foundAlert);
      this.userNom = foundAlert.etudiantPrenom;
      this.alertFound = foundAlert;

      const utilisateurfound = this.etudiant.find(
        (user: any) => user.user.prenom == this.userNom
      );
      if (utilisateurfound) {
        // console.log('utilisateur trouve', utilisateurfound);
        this.userNumberfound = utilisateurfound.user.telephone;
        console.log('le user numero trouve est le :', this.userNumberfound);
      }
    }
  }

  redirectToWhatsapp(): void {
    const phoneNumber = this.userNumberfound;
    this.WhatsApp.redirectWhatsapp(phoneNumber);
  }
  // selectedPrice: any;

  filterAlerts() {
    if (!this.selectedPrice) {
      this.filteredAlerts = this.allAlert;
    } else {
      this.filteredAlerts = this.allAlert.filter(
        (alert: any) => alert.budget <= parseInt(this.selectedPrice)
      );
    }
  }
}
