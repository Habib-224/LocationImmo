import { Component } from '@angular/core';
import { Alert } from 'src/app/models/Alert';
import { Localite } from 'src/app/models/Localite';
import { AlerteService } from 'src/app/services/alertes/alerte.service';
import { LocaliteService } from 'src/app/services/localites/localite.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-espace-perso',
  templateUrl: './espace-perso.component.html',
  styleUrls: ['./espace-perso.component.css'],
})
export class EspacePersoComponent {
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

  // Déclaration des méhodes
  constructor(private Alertservice: AlerteService) {}

  ngOnInit(): void {
    this.getAlertByUser();
  }

  getAlertByUser() {
    this.Alertservice.getAllertByUser().subscribe((response) => {
      console.log(response[0]);
      this.tabMessageFilter = response[0];
      this.tablisteuser = this.tabMessageFilter;
      this.ListeAlerts = this.tablisteuser;
    });
  }

  AjoutAlertByUser() {
    const AjoutAlert = new Alert();
    AjoutAlert.budget = this.budget_alert;
    AjoutAlert.description = this.description_alert;
    AjoutAlert.caracteristiques = this.caracteristique_alert;
    if (
      this.budget_alert == '' ||
      this.description_alert == '' ||
      this.caracteristique_alert == ''
    ) {
      console.log('veuillez remplire les champs');
    } else {
      this.Alertservice.registerAlert(
        AjoutAlert,
        this.onSuccessHandler,
        this.onErrorHandler
      );
      this.getAlertByUser();

      this.budget_alert = '';
      this.description_alert = '';
      this.caracteristique_alert = '';
    }
  }
  onSuccessHandler(response: any) {
    console.log('Ajouter avec Success:', response);
    // this.changeForme();
    // Vous pouvez ajouter ici d'autres actions après une inscription réussie, par exemple rediriger l'utilisateur vers une autre page.
  }

  // Fonction appelée en cas d'erreur lors de l'inscription
  onErrorHandler(error: any) {
    console.error("Erreur lors de l'ajout:", error);
  }
  recuperation(id: any) {
    this.recupID = id;
    const utilisateurTrouve = this.ListeAlerts.find(
      (alert: any) => alert.id === id
    );
    if (utilisateurTrouve) {
      this.budget_alert = utilisateurTrouve.budget;
      this.description_alert = utilisateurTrouve.description;
      this.caracteristique_alert = utilisateurTrouve.caracteristiques;
    } else {
      console.log('Utilisateurs non Trouve');
    }
  }

  UpdateAlertByUser(id: number) {
    const alertModifie = new Alert();
    alertModifie.budget = this.budget_alert;
    alertModifie.description = this.description_alert;
    alertModifie.caracteristiques = this.caracteristique_alert;
    if (
      this.budget_alert == '' ||
      this.description_alert == '' ||
      this.caracteristique_alert == ''
    ) {
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
          this.Alertservice.updateAlert(id, alertModifie).subscribe(
            (response) => {
              console.log(response);
            }
          );
          this.getAlertByUser();
        }
        this.budget_alert = '';
        this.description_alert = '';
        this.caracteristique_alert = '';
      });
    }
  }

  detailAlert(id: any) {
    this.recupID = id;
    const alertTrouve = this.ListeAlerts.find((alert: any) => alert.id === id);
    if (alertTrouve) {
      this.budget_alert = alertTrouve.budget;
      this.description_alert = alertTrouve.description;
      this.caracteristique_alert = alertTrouve.caracteristiques;
    } else {
      console.log('Utilisateurs non Trouve');
    }
  }

  MarquerPriseEnCharge(id: number) {
    console.log(id);
    const alertModifie = new Alert();
    alertModifie.budget = this.budget_alert;
    alertModifie.description = this.description_alert;
    alertModifie.caracteristiques = this.caracteristique_alert;
    Swal.fire({
      title: 'Etes vous sûr?',
      text: 'de vouloir Changer letat',
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
        this.Alertservice.PriseEnChargeAlert(id, alertModifie).subscribe(
          (response) => {
            console.log(response);
          }
        );
        this.getAlertByUser();
      }
    });
  }

  deleteAlertByUser(id: any) {
    console.log(id);
    const alertModifie = new Alert();
    alertModifie.budget = this.budget_alert;
    alertModifie.description = this.description_alert;
    alertModifie.caracteristiques = this.caracteristique_alert;
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
          title: 'Suppression Terminée!',
          text: 'Cette Suppression a été Effectue avec succées ',
          icon: 'success',
        });
        this.Alertservice.deleteAlert(id, alertModifie).subscribe(
          (response) => {
            console.log(response);
          }
        );
        this.getAlertByUser();
      }
    });
  }

  // Methode de recherche automatique pour les reseaux
  // --------------Methode de recherche et de pagination------------------
  // Methode de recherche automatique pour les reseaux
  onSearch() {
    // Recherche se fait selon le nom ou le prenom
    this.tabMessageFilter = this.ListeAlerts.filter(
      (elt: any) =>
        elt?.etudiant.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        elt?.etudiantPrenom
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
