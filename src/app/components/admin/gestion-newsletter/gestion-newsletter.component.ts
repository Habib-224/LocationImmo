import { Component } from '@angular/core';
import { AlerteService } from 'src/app/services/alertes/alerte.service';
import { LocaliteService } from 'src/app/services/localites/localite.service';
import { LogementService } from 'src/app/services/logement/logement.service';
import { UtilisateurserviceService } from 'src/app/services/utilisateur/utilisateurservice.service';
@Component({
  selector: 'app-gestion-newsletter',
  templateUrl: './gestion-newsletter.component.html',
  styleUrls: ['./gestion-newsletter.component.css'],
})
export class GestionNewsletterComponent {
  tabMessageFilter: any[] = [];
  ListeInscrit: any;
  filterValue: any = '';

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle
  firstImage: any;
  localiteLength: any;
  tailleAlert: any;

  // Déclaration des méhodes
  constructor(
    private utilisateurservice: UtilisateurserviceService,
    private alerservice: AlerteService,
    private localitetaille: LocaliteService
  ) {}
  ngOnInit(): void {
    this.tabMessageFilter = this.ListeInscrit;
    // this.getAlluser();
    this.getAllUserNewsletter();
    this.getAlertLength();
    this.getLocaliteLength();
  }

  getAllUserNewsletter() {
    this.utilisateurservice.getAllUserNewsletter().subscribe((response) => {
      let allInscrit = response.subscribers;
      this.ListeInscrit = allInscrit;
      this.tabMessageFilter = this.ListeInscrit;
      console.log('la liste de tous les logements ', this.ListeInscrit);
    });
  }

  // Methode de recherche automatique pour les reseaux
  onSearch() {
    this.tabMessageFilter = this.ListeInscrit.filter((elt: any) =>
      elt?.email.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  getAlertLength() {
    this.alerservice.getAllAlerts().subscribe((response) => {
      // console.log('taille des alerts', response.data.length);
      this.tailleAlert = response.data.length;
    });
  } 

  getLocaliteLength() {
    this.localitetaille.getAllLocalites().subscribe((response) => {
      this.localiteLength = response.localite.length;
    });
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
