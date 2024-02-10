import { Component } from '@angular/core';
import { Localite } from 'src/app/models/Localite';
import { LocaliteService } from 'src/app/services/localites/localite.service';
import { MessageService } from 'src/app/services/message/message.service';
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

  tabMessageFilter: any[] = [];
  filterValue: string = '';

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle
  ListeLocalite: any = [];
  recupID: any;

  // Déclaration des méhodes
  constructor(
    private localiteservice: LocaliteService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.tabMessageFilter = this.ListeLocalite;
    this.getAllLocalite();
  }

  AddLocalite() {
    const localite = new Localite();
    if (this.nom_localite === '' || this.nom_commune === '') {
      this.message.MessageSucces(
        'error',
        'Oops...',
        'veuillez remplir les champs',
        'center'
      );
    } else {
      localite.nomLocalite = this.nom_localite;
      localite.commune = this.nom_commune;
      this.localiteservice.addLocalites(localite).subscribe((response) => {
        // console.log(response);
        this.message.MessageSucces(
          'success',
          'Success',
          'Localite ajoute avec Succes',
          'center'
        );
        this.getAllLocalite();
      });
    }
  }

  getAllLocalite() {
    this.localiteservice.getAllLocalites().subscribe((response) => {
      let localite = response.localite;
      this.tabMessageFilter = localite;
      // this.tabMessageFilter = this.ListeLocalite;
      this.ListeLocalite = this.tabMessageFilter;
      console.log('liste des localite', this.ListeLocalite);
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
    let foundlocalite = this.ListeLocalite.find(
      (localite: any) => localite.id === this.recupID
    );
    if (foundlocalite) {
      // console.log("localite trouve ",foundlocalite)
      this.nom_localite = foundlocalite.nomLocalite;
      this.nom_commune = foundlocalite.commune;
    } else {
      console.log('Localite non trouve');
    }
    // console.log(this.recupID);
  }

  updateLocaliteByID(id: number) {
    const uplocalite = new Localite();
    uplocalite.nomLocalite = this.nom_localite;
    uplocalite.commune = this.nom_commune;
    if (this.nom_localite == '' || this.nom_commune == '') {
      // console.log('veuillez remplire les champs');
       this.message.MessageSucces(
         'error',
         'Oops...',
         'veuillez remplir les champs',
         'center'
       );
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
          this.message.MessageSucces(
            'success',
            'Success',
            'Modification Terminée!',
            'center'
          );
          // Swal.fire({
          //   title: 'Modification Terminée!',
          //   text: 'Cette Localite a été Modifié avec succées ',
          //   icon: 'success',
          // });
          this.localiteservice
            .updateLocalite(id, uplocalite)
            .subscribe((response) => {
              console.log(response);
              this.getAllLocalite();
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
      this.getAllLocalite();
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
