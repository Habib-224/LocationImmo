import { Component } from '@angular/core';
import { Proprietaire } from 'src/app/models/Proprietaire';
import { AlerteService } from 'src/app/services/alertes/alerte.service';
import { LocaliteService } from 'src/app/services/localites/localite.service';
import { UtilisateurserviceService } from 'src/app/services/utilisateur/utilisateurservice.service';
import Swal from 'sweetalert2';
import { Loading, Notify } from 'notiflix';


@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css'],
})
export class StatistiqueComponent {
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
  listeUtilisateur: any = [];
  tablisteuser: any = [];
  filterValue: string = '';
  localiteLength: any;

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle
  tailleAlert: any;

  // Déclaration des méhodes
  constructor(
    private utilisateurservice: UtilisateurserviceService,
    private localitetaille: LocaliteService,
    private alerservice: AlerteService
  ) {}
  ngOnInit(): void {
    this.tabMessageFilter = this.tabMessage;
    this.getAlluser();
    this.getLocaliteLength();
    this.getAlertLength();
  }

  // detail du formateur cliqué
  currentUtilisateur: any;
  detailUtilisateur(paramUtilisateur: any) {
    this.currentUtilisateur = this.tablisteuser.find(
      (item: any) => item.id == paramUtilisateur
    );
    // console.log(this.currentUtilisateur);
  }

  getAlluser() {
    this.utilisateurservice.getAllUsers().subscribe((response) => {
      this.listeUtilisateur = response.data;
      this.tabMessageFilter = this.listeUtilisateur;
      this.tablisteuser = this.tabMessageFilter;
    });
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

  archiveUtilisateurById(id: number) {
    const user = new Proprietaire();
    Swal.fire({
      title: 'Etes vous sûr?',
      text: 'de vouloir archiver',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Je confirme',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Archiver!',
          text: 'Ce mentor a été archiver avec succées ',
          icon: 'success',
        });

        this.utilisateurservice.archiveUtilisateur(id, user).subscribe(
          (response) => {
            console.log('mentore archive', response);
          },
          (error) => {
            console.error("Erreur lors de l'archivage du mentor", error);
          }
        );
      }
    });
  }

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
