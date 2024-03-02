import { Component } from '@angular/core';
import { Proprietaire } from 'src/app/models/Proprietaire';
import { UtilisateurserviceService } from 'src/app/services/utilisateur/utilisateurservice.service';
import Swal from 'sweetalert2';
import { Loading, Notify } from 'notiflix';

@Component({
  selector: 'app-gestion-utilisateurs',
  templateUrl: './gestion-utilisateurs.component.html',
  styleUrls: ['./gestion-utilisateurs.component.css'],
})
export class GestionUtilisateursComponent {
  // Déclaration des variables


  archive: boolean = true;
  filtreByRole: string = '';
  Archive() {
    this.archive = !this.archive;
  }

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
  selectectElement: any[] = [];

  tablisteuser: any = [];
  // Déclaration des méhodes
  constructor(private utilisateurservice: UtilisateurserviceService) {}

  ngOnInit(): void {
    this.getAlluser();
    this.getAlluserBloque();
    this.getEtudiant();
    this.getProprietaire();

    const proprietaire = JSON.parse(localStorage.getItem('proprietaire') || '');
    const etudiant = JSON.parse(localStorage.getItem('etudiant') || '');
    this.tabMessageFilter = this.selectectElement;
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
      console.log('la liste de tous les users', this.tabMessageFilter);
    });
  }

  getAlluserBloque() {
    this.utilisateurservice.getUtilisateurBloque().subscribe((response) => {
      let userBloque = response.data;
      this.listeUtilisateurBloque = userBloque;
      // console.log('la liste des utilisateurs bloquée ', response);
    });
  }

  getEtudiant() {
    this.utilisateurservice.getEtudiant().subscribe((response) => {
      let ListeEtudiant = response.data;
      this.listeEtudiant = ListeEtudiant;
      localStorage.setItem('etudiant', JSON.stringify(this.listeEtudiant));
      // console.log('Voici la liste des etudiant', this.listeEtudiant);
    });
  }

  getProprietaire() {
    this.utilisateurservice.getProprietaire().subscribe((response) => {
      let listeProprietaire = response.data;
      this.listeProprietaire = listeProprietaire;
      localStorage.setItem('proprietaire', JSON.stringify(listeProprietaire));

      // console.log('Voici la liste des proprietaire', listeProprietaire);
    });
  }

  SelectRole() {
    console.log('la valeur choisi est :', this.filtreByRole);
    if (this.filtreByRole == 'all') {
      this.selectectElement = [];
      this.selectectElement = this.tablisteuser;
      console.log(
        'la liste selectionné selon les options sont :',
        this.selectectElement
      );
    } else if (this.filtreByRole == 'etudiant') {
      this.selectectElement = [];
      for (let i = 0; i < this.tablisteuser.length; i++) {
        if (
          this.tablisteuser[i].role == 'etudiant' &&
          this.tablisteuser[i].inscriptionValidee == 'valider'
        )
          this.selectectElement.push(this.tablisteuser[i]);
      }
      console.log(
        'la liste selectionné selon les options sont :',
        this.selectectElement
      );
    } else {
      this.selectectElement = [];

      for (let i = 0; i < this.tablisteuser.length; i++) {
        if (
          this.tablisteuser[i].role == 'proprietaire' &&
          this.tablisteuser[i].inscriptionValidee == 'valider'
        ) {
          this.selectectElement.push(this.tablisteuser[i]);
        }
      }
      console.log(
        'la liste selectionné selon les options sont :',
        this.selectectElement
      );
    }
  }
  archiveUtilisateurById(id: number) {
    const user = new Proprietaire();
    Swal.fire({
      title: 'Etes vous sûr?',
      text: 'de vouloir archiver',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#133e33',
      cancelButtonColor: '#FFD100',
      confirmButtonText: 'Oui, Je confirme',
    }).then((result) => {
      Loading.dots();
      if (result.isConfirmed) {
        this.utilisateurservice.archiveUtilisateur(id, user).subscribe(
          (response) => {
            Notify.success('Ce Utilisateur a été archiver avec succès');
            this.getAlluser();
            window.location.reload();
            Loading.remove();
            // console.log('Ce utilisateur est archive', response);
          },
          (error) => {
            // console.error("Erreur lors de l'archivage du mentor", error);
          }
        );
      }
    });
  }

  desarchiveUtilisateurById(id: number) {
    const user = new Proprietaire();
    Swal.fire({
      title: 'Etes vous sûr?',
      text: 'de vouloir Desarchiver',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#133e33',
      cancelButtonColor: '#FFD100',
      confirmButtonText: 'Oui, Je confirme',
    }).then((result) => {
      if (result.isConfirmed) {
        Loading.dots();

        this.utilisateurservice.desarchiveUtilisateur(id, user).subscribe(
          (response) => {
            Notify.success('Ce Utilisateur a été desarchiver avec succès');
            this.getAlluserBloque();
            window.location.reload();
            Loading.remove();
            // console.log('Utilisateur desarchive', response);
          },
          (error) => {
            console.error("Erreur lors de l'archivage du mentor", error);
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

  // Pagination pour tous les tableaux de manières automatique
}
