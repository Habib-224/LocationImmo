import { Component } from '@angular/core';
import { UtilisateurserviceService } from 'src/app/services/utilisateur/utilisateurservice.service';

@Component({
  selector: 'app-gestion-localites',
  templateUrl: './gestion-localites.component.html',
  styleUrls: ['./gestion-localites.component.css'],
})
export class GestionLocalitesComponent {
  // Déclaration des variables
  tabMessage: any[] = [
    {
      id: 1,
      email: 'gg@gmail.com',
      sujet: "Demande d'info",
      message: 'Je veux un compte',
      createdAt: '10/11/2023',
    },
    {
      id: 2,
      email: 'gg@gmail.com',
      sujet: "Demande d'info",
      message: 'Je veux un compte',
      createdAt: '11/11/2023',
    },
    {
      id: 3,
      email: 'gg@gmail.com',
      sujet: "Demande d'aide",
      message: 'Je veux un compte',
      createdAt: '20/11/2023',
    },
    {
      id: 4,
      email: 'gg@gmail.com',
      sujet: 'Demande de renseignement',
      message: 'Je veux un compte',
      createdAt: '14/11/2023',
    },
  ];

  tabMessageFilter: any[] = [];
  filterValue: string = '';


  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle
  listeUtilisateur: any;

  // Déclaration des méhodes
  constructor(private utilisateurservice: UtilisateurserviceService) {}

  ngOnInit(): void {
    this.getAlluser();
    console.log(this.listeUtilisateur);
    this.tabMessageFilter = this.tabMessage;
  }


  getAlluser() {
    this.utilisateurservice.getAllUsers().subscribe((response) => {
      this.listeUtilisateur = response.data;
    });
  }

  // Methode de recherche automatique pour les reseaux
  onSearch() {
    // Recherche se fait selon le nom ou le prenom
    this.tabMessageFilter = this.tabMessage.filter(
      (elt: any) =>
        elt?.email.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        elt?.sujet.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        elt?.message.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        elt?.createdAt
          .toString()
          .toLowerCase()
          .includes(this.filterValue.toLowerCase())
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
