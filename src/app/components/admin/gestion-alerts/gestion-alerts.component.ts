import { Component } from '@angular/core';
import { AlerteService } from 'src/app/services/alertes/alerte.service';

@Component({
  selector: 'app-gestion-alerts',
  templateUrl: './gestion-alerts.component.html',
  styleUrls: ['./gestion-alerts.component.css'],
})
export class GestionAlertsComponent {
  // Déclaration des variables

  constructor(private AlerteService: AlerteService) {}

  tabMessageFilter: any[] = [];
  listAlert: any = [];
  filterValue: string = '';
  listeAllAlert: any = [];

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  // Déclaration des méhodes
  ngOnInit(): void {
    this.tabMessageFilter = this.listAlert;
    this.getAllAllert();
  }

  getAllAllert() {
    this.AlerteService.getAllAlerts().subscribe((response) => {
      this.listAlert = response.data;
      this.tabMessageFilter = this.listAlert;
      this.listeAllAlert = this.tabMessageFilter;
      // console.log('Voici la liste des alerts',response);
    });
  }

  currentAlert: any;
  detailAlert(paramAlert: any) {
    this.currentAlert = this.tabMessageFilter.find(
      (item: any) => item.id == paramAlert
    );
  }

  // Methode de recherche automatique pour les reseaux
  onSearch() {
    // Recherche se fait selon le nom ou le prenom
    this.tabMessageFilter = this.listeAllAlert.filter((elt: any) =>
      elt?.description.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  // Pagination pour tous les tableaux de manières automatique
  getItemsPage() {
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.tabMessageFilter.slice(indexDebut, indexFin);
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(
      this.tabMessageFilter.length / this.itemsParPage
    );
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabMessageFilter.length / this.itemsParPage);
  }
}
