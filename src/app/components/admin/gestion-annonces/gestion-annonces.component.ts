import { Component } from '@angular/core';
import { LogementService } from 'src/app/services/logement/logement.service';
import { UtilisateurserviceService } from 'src/app/services/utilisateur/utilisateurservice.service';

@Component({
  selector: 'app-gestion-annonces',
  templateUrl: './gestion-annonces.component.html',
  styleUrls: ['./gestion-annonces.component.css'],
})
export class GestionAnnoncesComponent {
  // Déclaration des variables
  // tabMessage: any[] = [
  //   {
  //     id: 1,
  //     email: 'gg@gmail.com',
  //     sujet: "Demande d'info",
  //     message: 'Je veux un compte',
  //     createdAt: '10/11/2023',
  //   },
  //   {
  //     id: 2,
  //     email: 'gg@gmail.com',
  //     sujet: "Demande d'info",
  //     message: 'Je veux un compte',
  //     createdAt: '11/11/2023',
  //   },
  //   {
  //     id: 3,
  //     email: 'gg@gmail.com',
  //     sujet: "Demande d'aide",
  //     message: 'Je veux un compte',
  //     createdAt: '20/11/2023',
  //   },
  //   {
  //     id: 4,
  //     email: 'gg@gmail.com',
  //     sujet: 'Demande de renseignement',
  //     message: 'Je veux un compte',
  //     createdAt: '14/11/2023',
  //   },
  // ];

  tabMessageFilter: any[] = [];
  filterValue: string = '';
  ListeLogement: any = [];

  logementFound: any;

  // Attribut pour la pagination
  itemsParPage = 5; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle
  firstImage: any;

  // Déclaration des méhodes
  constructor(
    private utilisateurservice: UtilisateurserviceService,
    private LogementService: LogementService
  ) {}
  ngOnInit(): void {
    this.tabMessageFilter = this.ListeLogement;
    // this.getAlluser();
    this.getAllLogement();
  }

  detailLogement(id: any) {
    this.logementFound = this.tabMessageFilter.find((logement: any) => logement.id === id);
    if (this.logementFound) {
      console.log("logement trouve", this.logementFound)
       if (this.logementFound.image.length > 0) {
         console.log("oui c'est superieur a 0");
         this.firstImage =
           'http://127.0.0.1:8000/storage/' +
           this.logementFound.image[0].nomImage;
       }
    }
  }

  getAllLogement() {
    this.LogementService.getAlllogment().subscribe((response) => {
      let allogement = response[0];
      this.ListeLogement = allogement;
      this.tabMessageFilter = this.ListeLogement;
      console.log('la liste de tous les logements ', this.tabMessageFilter);
    });
  }

  // Methode de recherche automatique pour les reseaux
  onSearch() {
    // Recherche se fait selon le nom ou le prenom
    this.tabMessageFilter = this.ListeLogement.filter(
      (elt: any) =>
        elt?.localite.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        elt?.type.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        elt?.adresse.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        elt?.proprietairePrenom
          .toLowerCase()
          .includes(this.filterValue.toLowerCase()) ||
        elt?.proprietaire.toLowerCase().includes(this.filterValue.toLowerCase())
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
