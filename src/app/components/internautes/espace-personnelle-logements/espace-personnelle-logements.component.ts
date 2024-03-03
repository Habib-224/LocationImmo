import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Alert } from 'src/app/models/Alert';
import { Localite } from 'src/app/models/Localite';
import { Logement } from 'src/app/models/Logement';
import { AlerteService } from 'src/app/services/alertes/alerte.service';
import { LocaliteService } from 'src/app/services/localites/localite.service';
import { LogementService } from 'src/app/services/logement/logement.service';
import Swal from 'sweetalert2';
import { Notify, Loading } from 'notiflix';
@Component({
  selector: 'app-espace-personnelle-logements',
  templateUrl: './espace-personnelle-logements.component.html',
  styleUrls: ['./espace-personnelle-logements.component.css'],
})
export class EspacePersonnelleLogementsComponent {
  // Déclaration des variables

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
  tabMessageFilter1: any;

  // Déclaration des méhodes
  constructor(
    private Alertservice: AlerteService,
    private logementService: LogementService
  ) {}

  localite: any;
  ngOnInit(): void {
    this.getAllLogementByOwner();
    this.localite = JSON.parse(localStorage.getItem('localite') || '');
  }

  keppAllLogement: any = [];
  tablistAllLogement: any = [];
  logementList: any = [];

  // pour les infos du logement
  adresse_logement: string = '';
  type_logement: string = '';
  prix_logement: string = '';
  description_logement: string = '';
  nombreChambre_logement: string = '';
  disponibilite_logement: string = '';
  superficie_logement: string = '';
  photo!: [];
  firstImage: any;

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
      confirmButtonColor: '#133e33',
      cancelButtonColor: '#ffd100',
      confirmButtonText: 'Oui, Je confirme',
    }).then((result) => {
      Loading.dots();
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: 'Suppression Terminée!',
        //   text: 'Cette Suppression a été Effectue avec succées ',
        //   icon: 'success',
        // });
        this.logementService
          .deleteLogementByOwner(id, logement)
          .subscribe((response) => {
            Notify.success('Suppression terminée');
            // console.log(response);
            Loading.remove();
          });
        this.getAllLogementByOwner();
      } else {
        Loading.remove();
      }
    });
  }

  // --------------------------
  exacteLocalite: boolean = false;
  exacteAdresse: boolean = false;
  exacteType: boolean = false;
  exacteSurface: boolean = false;

  verifeLocalite: any = '';
  verifeAdresse: any = '';
  verifeType: any = '';
  verifeSuface: any = '';

  exacteChambre: boolean = false;
  exacteDisponibilite: boolean = false;
  exactePrix: boolean = false;
  exacteEquipement: boolean = false;

  verifeChambre: any = '';
  verifeDisponibilite: any = '';
  verifePrix: any = '';
  verifeEquipement: any = '';

  exacteDescription: boolean = false;
  verifeDescription: any = '';

  exacteImage: boolean = false;
  verifeImage: any = '';

  //---------------------------

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
  };
  image: any = [];

  validateLocalite() {
    if (this.logement.localite_id == '') {
      this.verifeLocalite = '';
      this.exacteType = false;
    } else if (this.localite != '') {
      this.exacteLocalite = true;
      // this.verifeLocalite = 'Valide';
    }
  }

  validerAdresse(adresse: string): boolean {
    const regex = /^\D.*$/; // Vérifie si l'adresse ne commence pas par un chiffre
    return regex.test(adresse.trim());
  }

  validateImage() {
    if (this.image.length === 0) {
      this.exacteImage = false;
      this.verifeImage = '';
      // console.log('vide', this.image.length);
    } else {
      this.exacteImage = true;
      this.verifeImage = '';
      // console.log('pas vide', this.image.length);
    }
  }
  validateAdresse() {
    const adresseTrimed = this.logement.adresse.trim(); // Appliquer trim()
    if (this.logement.adresse == '') {
      this.verifeAdresse = '';
      this.exacteAdresse = false;
    } else if (
      this.validerAdresse(this.logement.adresse) == true &&
      this.logement.adresse.length >= 2
    ) {
      this.exacteAdresse = true;
      // this.verifeAdresse = "l'adresse est valide";
      this.verifeAdresse = '';
    } else {
      this.exacteAdresse = false;
      this.verifeAdresse = "l'adresse est invalide ";
    }
  }

  validateType() {
    if (this.logement.type == '') {
      this.verifeType = '';
      this.exacteType = false;
    } else if (this.logement.type !== '') {
      this.verifeType = '';
      this.exacteType = true;
    }
  }

  validateSurface() {
    if (this.logement.superficie == null) {
      this.verifeSuface = '';
      this.exacteSurface = false;
    } else {
      this.verifeSuface = '';
      this.exacteSurface = true;
    }
  }

  validateChambre() {
    if (this.logement.nombreChambre == null) {
      this.verifeChambre = '';
      this.exacteChambre = false;
    } else {
      this.verifeChambre = '';
      this.exacteChambre = true;
    }
  }

  validatePrix() {
    if (this.logement.prix == null) {
      this.verifePrix = '';
      this.exactePrix = false;
    } else {
      this.verifePrix = '';
      this.exactePrix = true;
    }
  }

  validateEquipement() {
    if (this.logement.equipements == '') {
      this.verifeEquipement = '';
      this.exacteEquipement = false;
    } else {
      this.verifeEquipement = '';
      this.exacteEquipement = true;
    }
  }

  validateDescription() {
    if (this.logement.description == '') {
      this.exacteDescription = false;
      this.verifeDescription = '';
    } else if (this.logement.description != '') {
      this.exacteDescription = true;
      this.verifeDescription = '';
    }
  }

  validateDisponibilite() {
    if (this.logement.disponibilite == null) {
      this.verifeDisponibilite = '';
      this.exacteDisponibilite = false;
    } else {
      const regex =
        /^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])$/;
      if (regex.test(this.logement.disponibilite)) {
        this.verifeDisponibilite = 'Valide';
        this.exacteDisponibilite = true;
      } else {
        this.verifeDisponibilite = 'Format de date invalide';
        this.exacteDisponibilite = false;
      }
    }
  }
  detailLogement(id: number) {
    this.recupID = id;
    // alert(id);
    const logementrouve = this.tablistAllLogement.find(
      (logement: any) => logement.id === id
    );
    if (logementrouve) {
      this.logementList = logementrouve;
      console.log('logementrouve', logementrouve);
      this.adresse_logement = logementrouve.adresse;
      this.type_logement = logementrouve.type;
      this.prix_logement = logementrouve.prix;
      this.nombreChambre_logement = logementrouve.nombreChambre;
      this.disponibilite_logement = logementrouve.disponibilite;

      // for (let i = 0; i <= this.logementList.length; i++) {
      //   const logement = this.logementList[i];
      if (this.logementList.image.length > 0) {
        console.log("oui c'est superieur a 0");
        this.firstImage =
          'http://127.0.0.1:8000/storage/' +
          this.logementList.image[0].nomImage;
      }
      // }
    } else {
      console.log('Utilisateurs non Trouve');
    }
  }

  // Methode de recherche automatique pour les reseaux
  // --------------Methode de recherche et de pagination------------------
  // Methode de recherche automatique pour les reseaux

  ajouterLogement() {
    Loading.dots();
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

    // Ajout de l'image
    if (this.image) {
      formData.append('image[]', this.image);
    }

    this.logementService.ajouterLogement(formData).subscribe(
      (response) => {
        Notify.success('Ajouté avec succès');
        // console.log('Logement ajouté avec succès', response);
        // console.log('information saisi', formData);
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
        this.getAllLogementByOwner();

        Loading.remove();

        // this.image = null;
      },
      (error) => {
        Notify.failure("Erreur l'ors de l'ajout");
        // console.error("Erreur lors de l'ajout du logement", error);
        Loading.remove();
      }
    );
  }

  logementFound: any;

  idlogement: any;
  recupidlogement(id: any) {
    this.idlogement = id;
    console.log('voici les valeurs', this.idlogement);

    this.logementFound = this.tablistAllLogement.find(
      (logement: any) => logement.id === this.idlogement
    );
    if (this.logementFound) {
      console.log('trouve', this.logement);
    }

    this.logement.adresse = this.logementFound.adresse;
    this.logement.nombreChambre = this.logementFound.nombreChambre;
    this.logement.prix = this.logementFound.prix;

    // ("voic  ",this.idlogement);
  }

  updateLogement() {

    Loading.dots();

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

    // Ajout de l'image
    if (this.image) {
      formData.append('image[]', this.image);
    }

    this.logementService.ModifierLogement(formData, this.idlogement).subscribe(
      (response) => {
        Notify.success("Logement modifié")
        this.getAllLogementByOwner();
        // console.log('voici le message', response);
        Loading.remove();
      },

      (error) => {
        Notify.failure("Erreur l'ors de la modification")
        console.log('voici le message', error);
        Loading.remove();
      }
    );
  }

  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.image = files[0];
    }
  }

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
}
