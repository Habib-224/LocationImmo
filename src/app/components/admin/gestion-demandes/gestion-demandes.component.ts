import { Component } from '@angular/core';
import { Proprietaire } from 'src/app/models/Proprietaire';
import { LogementService } from 'src/app/services/logement/logement.service';
import { UtilisateurserviceService } from 'src/app/services/utilisateur/utilisateurservice.service';
import Swal from 'sweetalert2';
import { Loading, Notify } from 'notiflix';

@Component({
  selector: 'app-gestion-demandes',
  templateUrl: './gestion-demandes.component.html',
  styleUrls: ['./gestion-demandes.component.css'],
})
export class GestionDemandesComponent {
  tabMessageFilter: any[] = [];
  filterValue: string = '';

  // Attribut pour la pagination
  itemsParPage = 5; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  // Déclaration des méhodes

  listeUtilisateur: any = [];
  listeUtilisateurBloque: any = [];
  listeEtudiant: any = [];
  listeProprietaire: any = [];
  ListeUserEnAttente: any = [];

  tablisteuser: any = [];
  // Déclaration des méhodes
  constructor(private utilisateurservice: UtilisateurserviceService) {}

  ngOnInit(): void {
    this.getAlluser();
    const proprietaire = JSON.parse(localStorage.getItem('proprietaire') || '');
    const etudiant = JSON.parse(localStorage.getItem('etudiant') || '');
    this.tabMessageFilter = this.ListeUserEnAttente;
  }

  currentUtilisateur: any;
  detailUtilisateur(id: any) {
     this.currentUtilisateur = this.ListeUserEnAttente.find(
      (item: any) => item.id == id
    );

    if (this.currentUtilisateur) {
      console.log("l'utilisateur trouvée est ",this.currentUtilisateur)
    }

  }

  getAlluser() {
    this.utilisateurservice.getAllUsers().subscribe((response) => {
      this.listeUtilisateur = response.data;
      this.tabMessageFilter = this.listeUtilisateur;
      this.tablisteuser = this.tabMessageFilter;

      if (this.ListeUserEnAttente.length == 0) {
        for (let i = 0; i < this.tablisteuser.length; i++) {
          if (this.tablisteuser[i].inscriptionValidee == 'enAttente') {
            this.ListeUserEnAttente.push(this.tablisteuser[i]);
          }
        }
      }
      // console.log('voici la liste des attentes', this.ListeUserEnAttente);
    });
  }

  accepterDemande(id: any, i: number) {
    // console.log("voici l'id", id);
    // console.log('voici la position', i);
    const user = new Proprietaire();
    Swal.fire({
      title: 'Etes vous sûr?',
      text: 'de vouloir Accepter La demande',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#133e33',
      cancelButtonColor: '#ffd100',
      confirmButtonText: 'Oui, Je confirme',
    }).then((result) => {
      if (result.isConfirmed) {
        Loading.dots();

        this.utilisateurservice.accepterInscritption(id, user).subscribe(
          (response) => {
            this.ListeUserEnAttente.splice(i, 1);
            Notify.success("La demande d'inscription est approuvée");

            this.getAlluser();
            Loading.remove();
          },
          (error) => {
            console.error("Erreur lors de l'acceptation", error);
          }
        );
      }
    });
  }

  refuserDemande(id: number, i: number) {
    // console.log("voici l'id", id);
    // console.log("voici l'id", id);
    const user = new Proprietaire();
    Swal.fire({
      title: 'Etes vous sûr?',
      text: 'de vouloir Rejeter La demande',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#133e33',
      cancelButtonColor: '#ffd100',
      confirmButtonText: 'Oui, Je confirme',
    }).then((result) => {
      if (result.isConfirmed) {
        Loading.dots();

        this.utilisateurservice.rejeterInscritption(id, user).subscribe(
          (response) => {
            // console.log('ce utilisateur a ete rejeter', response);
            this.ListeUserEnAttente.splice(i, 1);
            Notify.success("La demande d'inscription est rejeter");
            this.getAlluser();
            Loading.remove();
          },
          (error) => {
            console.error('Erreur lors du rejet', error);
          }
        );
      }
    });
  }

  // --------------Methode de recherche et de pagination------------------
  // Methode de recherche automatique pour les reseaux
  onSearch() {
    // Recherche se fait selon le nom ou le prenom
    this.tabMessageFilter = this.ListeUserEnAttente.filter(
      (elt: any) =>
        elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        elt?.prenom.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  // Pagination pour tous les tableaux de manières automatique
  getItemsPage() {
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.ListeUserEnAttente.slice(indexDebut, indexFin);
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(
      this.ListeUserEnAttente.length / this.itemsParPage
    );
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.ListeUserEnAttente.length / this.itemsParPage);
  }
}
