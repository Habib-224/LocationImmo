import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlerteService } from 'src/app/services/alertes/alerte.service';
import { WhatsAppService } from 'src/app/services/whatsApp/whats-app.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements OnInit {
  constructor(
    private alertService: AlerteService,
    private WhatsApp: WhatsAppService,
    private route: Router
  ) {}

  isModalOpen: boolean = false;

  listAlert: any[] = [];
  selectedPrice: any;
  filteredAlerts: any[] = [];
  allAlert: any[] = [];

  etudiant: any;
  userStatut: any;
  userOnline_role: any;

  proprio_etudiant: boolean = true;
  ngOnInit(): void {
    this.getAllAlert();
    this.etudiant = JSON.parse(localStorage.getItem('etudiant') || '');
    // console.log('liste des etudiants', this.etudiant[0].user.prenom);

    const userOnline = JSON.parse(localStorage.getItem('userOnline') || '');
    this.userStatut = JSON.parse(localStorage.getItem('Userconnect') || '');
    console.log('statut du user', this.userStatut);
    this.userOnline_role = userOnline.user.role;

    console.log('utilisateur connecte', this.userOnline_role);

    this.verifechange();
  }

  verifechange() {
    if (this.userOnline_role === 'proprietaire' && this.userStatut === true) {
      this.proprio_etudiant = false;
      // console.log('vous etes proprietaire');
    } else if (
      this.userOnline_role === 'etudiant' &&
      this.userStatut === true
    ) {
      this.proprio_etudiant = true;
      // console.log('vous etes etudiant');
    }
  }

  AjouterAlert() {
    if (this.userStatut === false) {
      this.route.navigate(['/login']);
    } else {
      // document.getElementById('exampleModal').click();
      this.isModalOpen = true;
      console.log('true');
    }
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
    const foundAlert = this.listAlert.find((alert) => alert.id === id);
    if (foundAlert) {
      console.log(foundAlert);
      this.userNom = foundAlert.etudiantPrenom;
      this.alertFound = foundAlert;

      const utilisateurfound = this.etudiant.find(
        (user: any) => user.user.prenom == this.userNom
      );
      if (utilisateurfound) {
        this.userNumberfound = utilisateurfound.user.telephone;
        console.log('le user numero trouve est le :', this.userNumberfound);
      }
    }
  }

  redirectToWhatsapp(): void {
    const phoneNumber = this.userNumberfound;
    this.WhatsApp.redirectWhatsapp(phoneNumber);
  }

  filterAlerts() {
    if (!this.selectedPrice) {
      this.filteredAlerts = this.allAlert;
    } else {
      this.filteredAlerts = this.allAlert.filter(
        (alert: any) => alert.budget <= parseInt(this.selectedPrice)
      );
    }
  }

  articlesParPage: number = 3; // Nombre d'articles par page
  pageActuelle: number = 1; // Pag
  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
    const indexFin = indexDebut + this.articlesParPage;
    return this.filteredAlerts.slice(indexDebut, indexFin);
  }

  changePage(page: number) {
    this.pageActuelle = page;
  }

  // Méthode pour générer la liste des numéros de page
  get pages(): number[] {
    const totalPages = Math.ceil(
      this.filteredAlerts.length / this.articlesParPage
    );
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.filteredAlerts.length / this.articlesParPage);
  }
}
