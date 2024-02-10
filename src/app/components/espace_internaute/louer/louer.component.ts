import { Component, OnInit } from '@angular/core';
import { LogementService } from 'src/app/services/logement/logement.service';

@Component({
  selector: 'app-louer',
  templateUrl: './louer.component.html',
  styleUrls: ['./louer.component.css'],
})
export class LouerComponent implements OnInit {
  tabMessageFilter: any;
  tabMessageFilter1: any;
  stockimage: any = [];

  // Initialisez l'objet de critères de recherche
  searchCriteria = {
    type: {
      studio: false,
      appartement: false,
    },
    disponibilite: null,
    budget: null,
    localite: '',
    avecImage: false,
  };

  // Initialisez la liste des logements
  logements: any[] = [];
  constructor(private logementservice: LogementService) {}

  ngOnInit(): void {
    this.getAllLogement();
  }
  getAllLogement() {
    this.logementservice.getAlllogment().subscribe((response) => {
      // console.log('la liste de tous les logements', response);
      console.log('la liste de tous les logements', response[0]);
      this.stockimage = response[0];

      this.tabMessageFilter1 = this.stockimage.map((logement: any) => {
        if (logement.image.length > 0) {
          return {
            ...logement,
            firstImage:
              'http://127.0.0.1:8000/storage/' + logement.image[0].nomImage,
          };
        }
        return logement;
      });

      // console.log(
      //   'Tous les logements avec la première image :',
      //   this.tabMessageFilter1
      // );
    });
  }

  // Fonction de recherche
  search() {
    // Effectuez la recherche directement sur la liste existante
    this.tabMessageFilter1 = this.tabMessageFilter1.filter((logement: any) => {
      // Logique de filtrage (même logique que précédemment)
      const typeMatch =
        (!this.searchCriteria.type.studio ||
          logement.type.toLowerCase() === 'studio') &&
        (!this.searchCriteria.type.appartement ||
          logement.type.toLowerCase() === 'appartement');

      const localiteMatch = logement.localite
        .toLowerCase()
        .includes(this.searchCriteria.localite.toLowerCase());

      // Combiner toutes les conditions
      return typeMatch && localiteMatch;
    });

    // Si le champ 'localite' est vide après la recherche, réinitialiser la liste des logements
    if (
      !this.searchCriteria.localite.trim() &&
      this.tabMessageFilter1.length === 0
    ) {
      this.tabMessageFilter1 = this.logements.slice();
      console.log("liste des logements",this.tabMessageFilter1)// Copie complète de la liste des logements
    }

    // console.log(this.tabMessageFilter1);
  }

  // detail(id:any) {
  //   alert(id);
  // }
}
