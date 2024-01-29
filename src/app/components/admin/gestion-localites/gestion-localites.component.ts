import { Component } from '@angular/core';
import { Localite } from 'src/app/models/Localite';
import { LocaliteService } from 'src/app/services/localites/localite.service';
import { UtilisateurserviceService } from 'src/app/services/utilisateur/utilisateurservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-localites',
  templateUrl: './gestion-localites.component.html',
  styleUrls: ['./gestion-localites.component.css'],
})
export class GestionLocalitesComponent {
  // Déclaration des variables

  nom_localite = '';
  nom_commune = '';
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
  ListeLocalite: any = [];
  recupID: any;

  // Déclaration des méhodes
  constructor(private localiteservice: LocaliteService) {}

  ngOnInit(): void {
    this.tabMessageFilter = this.ListeLocalite;
    this.getAllLocalite();
  }

  getAllLocalite() {
    this.localiteservice.getAllLocalites().subscribe((response) => {
      let localite = response.localite;
      this.tabMessageFilter = localite;
      // this.tabMessageFilter = this.ListeLocalite;
      this.ListeLocalite = this.tabMessageFilter;
    });
  }

  currentLocalite: any;
  detailLocalite(paramLocalite: any) {
    this.currentLocalite = this.ListeLocalite.find(
      (item: any) => item.id == paramLocalite
    );
    console.log(this.currentLocalite);
  }

  recuperationByID(id: number) {
    this.recupID = id;
    // console.log(this.recupID);
  }

  updateLocaliteByID(id: number) {
    const uplocalite = new Localite();
    uplocalite.nomLocalite = this.nom_localite;
    uplocalite.commune = this.nom_commune;
    if (this.nom_localite == '' || this.nom_commune == '') {
      console.log('veuillez remplire les champs');
    } else {
      Swal.fire({
        title: 'Etes vous sûr?',
        text: 'de vouloir Modifier',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, Je confirme',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Modification Terminée!',
            text: 'Cette Localite a été Modifié avec succées ',
            icon: 'success',
          });
          this.localiteservice
            .updateLocalite(id, uplocalite)
            .subscribe((response) => {
              console.log(response);
            });
        }
      });

      // console.log("le nom localite est :", this.nom_localite, "la commune est :", this.nom_commune);
    }
  }

  deleteLocaliteByID(id: number) {
    const localite = new Localite();
    Swal.fire({
      title: 'Etes vous sûr?',
      text: 'de vouloir Supprimer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Je confirme',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Suppression Terminée!',
          text: 'Cette Localite a été Supprimer avec succées ',
          icon: 'success',
        });
        this.localiteservice
          .deleteLocalite(id, localite)
          .subscribe((response) => {
            console.log(response);
          });
      }
    });
  }

  // Methode de recherche automatique pour les reseaux
  onSearch() {
    // Recherche se fait selon le nom ou le prenom
    this.tabMessageFilter = this.ListeLocalite.filter(
      (elt: any) =>
        elt?.commune.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        elt?.nomLocalite.toLowerCase().includes(this.filterValue.toLowerCase())
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
