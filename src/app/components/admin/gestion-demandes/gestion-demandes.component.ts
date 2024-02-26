import { Component } from '@angular/core';
import { Proprietaire } from 'src/app/models/Proprietaire';
import { LogementService } from 'src/app/services/logement/logement.service';
import { UtilisateurserviceService } from 'src/app/services/utilisateur/utilisateurservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-demandes',
  templateUrl: './gestion-demandes.component.html',
  styleUrls: ['./gestion-demandes.component.css'],
})
export class GestionDemandesComponent {
  tabMessageFilter: any[] = [];
  filterValue: string = '';

  // Attribut pour la pagination
  itemsParPage = 11; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  // Déclaration des méhodes

  listeUtilisateur: any = [];
  listeUtilisateurBloque: any = [];
  listeEtudiant: any = [];
  listeProprietaire: any = [];

  tablisteuser: any = [];
  // Déclaration des méhodes
  constructor(private utilisateurservice: UtilisateurserviceService) {}

  ngOnInit(): void {
    this.getAlluser();
    const proprietaire = JSON.parse(localStorage.getItem('proprietaire') || '');
    const etudiant = JSON.parse(localStorage.getItem('etudiant') || '');
  }

  currentUtilisateur: any;
  detailUtilisateur(paramUtilisateur: any) {
    this.currentUtilisateur = this.tablisteuser.find(
      (item: any) => item.id == paramUtilisateur
    );
  }

  getAlluser() {
    this.utilisateurservice.getAllUsers().subscribe((response) => {
      this.listeUtilisateur = response.data;
      this.tabMessageFilter = this.listeUtilisateur;
      this.tablisteuser = this.tabMessageFilter;

      console.log(this.tabMessageFilter);
    });
  }

  accepterDemande(id: any) {
    console.log("voici l'id", id);
    const user = new Proprietaire();
    Swal.fire({
      title: 'Etes vous sûr?',
      text: 'de vouloir Accepter La demande',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Je confirme',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Archiver!',
          text: "La demande D'inscription est approuvée",
          icon: 'success',
        });

        this.utilisateurservice.accepterInscritption(id, user).subscribe(
          (response) => {
            console.log('ce utilisateur a ete accepte', response);
            this.getAlluser();
          },
          (error) => {
            console.error("Erreur lors de l'acceptation", error);
          }
        );
      }
    });
  }

  refuserDemande(id: number) {
    console.log("voici l'id", id);
    console.log("voici l'id", id);
    const user = new Proprietaire();
    Swal.fire({
      title: 'Etes vous sûr?',
      text: 'de vouloir Rejeter La demande',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Je confirme',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Archiver!',
          text: "La demande D'inscription est rejeter",
          icon: 'success',
        });

        this.utilisateurservice.rejeterInscritption(id, user).subscribe(
          (response) => {
            console.log('ce utilisateur a ete rejeter', response);
            this.getAlluser();
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
    this.tabMessageFilter = this.tablisteuser.filter(
      (elt: any) =>
        elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        elt?.prenom.toLowerCase().includes(this.filterValue.toLowerCase())
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
