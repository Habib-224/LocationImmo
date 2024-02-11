import { Component, OnInit } from '@angular/core';
import { Logement } from 'src/app/models/Logement';
import { AlerteService } from 'src/app/services/alertes/alerte.service';
import { LogementService } from 'src/app/services/logement/logement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css'],
})
export class AnnoncesComponent implements OnInit{
  // Déclarez trois variables distinctes pour représenter l'état de chaque étape
  changeStep1: boolean = true;
  changeStep2: boolean = false;
  changeStep3: boolean = false;

  // dfdfd

  nom_localite = '';
  nom_commune = '';

  budget_alert: any = '';
  description_alert: any = '';
  caracteristique_alert: any = '';

  tabMessageFilter: any[] = [];
  filterValue: string = '';

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle
  ListeAlerts: any = [];
  recupID: any;
  tablisteuser: any = [];

  // Déclaration des méhodes
  constructor(
    private Alertservice: AlerteService,
    private logementService: LogementService
  ) {}

  ngOnInit(): void {
    this.getAllLogementByOwner();
  }

  keppAllLogement: any = [];
  tablistAllLogement: any = [];
  logementList = [];

  // pour les infos du logement
  adresse_logement: string = '';
  type_logement: string = '';
  prix_logement: string = '';
  description_logement: string = '';
  nombreChambre_logement: string = '';
  disponibilite_logement: string = '';
  superficie_logement: string = '';
  photo!: [];

  // Fin pour les infos du logement

  // adresse_logement: any;
  // disponibilite_logement: any;
  // localite_logement: any;

  getAllLogementByOwner() {
    this.logementService.getAllLogementByOwner().subscribe((response) => {
      this.tabMessageFilter = response[0];
      this.keppAllLogement = this.tabMessageFilter;
      this.tablistAllLogement = this.keppAllLogement;
      console.log('liste logement', this.tablistAllLogement);
    });
  }

  deleteLogement(id: number) {
    const logement = new Logement();
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
          text: 'Cette Suppression a été Effectue avec succées ',
          icon: 'success',
        });
        this.logementService
          .deleteLogementByOwner(id, logement)
          .subscribe((response) => {
            console.log(response);
          });
        this.getAllLogementByOwner();
      }
    });
  }

  detailLogement(id: number) {
    this.recupID = id;
    alert(id);
    const logementrouve = this.tablistAllLogement.find(
      (logement: any) => logement.id === id
    );
    if (logementrouve) {
      this.logementList = logementrouve;
      console.log(logementrouve);
    } else {
      console.log('Utilisateurs non Trouve');
    }
  }

  // Methode de recherche automatique pour les reseaux
  // --------------Methode de recherche et de pagination------------------
  // Methode de recherche automatique pour les reseaux
  onSearch() {
    // Recherche se fait selon le nom ou le prenom
    this.tabMessageFilter = this.tablistAllLogement.filter(
      (elt: any) =>
        elt?.type.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        elt?.localite.toLowerCase().includes(this.filterValue.toLowerCase())
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

  logement: any = {
    adresse: '',
    type: '',
    description: '',
    nombreChambre: null,
    disponibilite: '',
    superficie: null,
    prix: null,
    equipements: '',
    localite_id: null,
    nomImage: '',
    image:[]
  };
  image: any = [];

  ajouterLogement() {
    const formData = new FormData();

    formData.append('adresse', this.logement.adresse);
    formData.append('type', this.logement.type);
    formData.append('description', this.logement.description);
    formData.append('nombreChambre', this.logement.nombreChambre);
    formData.append('disponibilite', this.logement.disponibilite);
    formData.append('superficie', this.logement.superficie);
    formData.append('prix', this.logement.prix);
    formData.append('equipements', this.logement.equipements);
    formData.append('localite_id', this.logement.localite_id);
    formData.append('image[]', this.image['image.jpg'] as Blob);

    Object.keys(this.logement).forEach((key) => {
      formData.append(key, this.logement[key]);
    });

    if (this.image) {
    }

    this.logementService.ajouterLogement(formData).subscribe(
      (response) => {
        console.log('Logement ajouté avec succès', response);
        console.log('information saisi', formData);
        this.logement = {
          adresse: '',
          type: '',
          description: '',
          nombreChambre: null,
          disponibilite: '',
          superficie: null,
          prix: null,
          equipements: '',
          localite_id: null,
        };
        // this.image = null;
      },
      (error) => {
        console.error("Erreur lors de l'ajout du logement", error);
      }
    );
  }

  getFile(event: any) {
    console.warn(event.target.files[0]);
    let image = event.target.files[0] as File;
    this.image = event.target.files[0] as File;
    this.logement.image = event.target.files[0] as File;
    // this.image.push(image);
    console.log(event.target.files[0]);
    console.log("image du logement", image);
  }
  // dfdfd

  public changerform(direction: string) {
    if (direction === 'suivant') {
      // Logique pour passer à l'étape suivante
      if (this.changeStep1) {
        this.changeStep1 = false;
        this.changeStep2 = true;
      } else if (this.changeStep2) {
        this.changeStep2 = false;
        this.changeStep3 = true;
      }
    } else if (direction === 'retour') {
      // Logique pour revenir à l'étape précédente
      if (this.changeStep3) {
        this.changeStep3 = false;
        this.changeStep2 = true;
      } else if (this.changeStep2) {
        this.changeStep2 = false;
        this.changeStep1 = true;
      }
    }
  }

  valider() {
    alert('informations valider');
  }
}
