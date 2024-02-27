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
  listalllogement: any;
  stockimage: any = [];

  // Initialisez l'objet de critères de recherche
  searchCriteria = {
    type: '',
    localite: '',
  };

  // Initialisez la liste des logements
  logements: any[] = [];
  constructor(private logementservice: LogementService) {}

  localite: any;
  ngOnInit(): void {
    this.getAllLogement();
    this.localite = JSON.parse(localStorage.getItem('localite') || '');
    this.tabMessageFilter = this.listalllogement;
  }

  getAllLogement() {
    this.logementservice.getAlllogment().subscribe((response) => {
      // console.log('la liste de tous les logements', response);
      console.log('la liste de tous les logements', response[0]);
      this.listalllogement = response[0];
      this.tabMessageFilter = this.listalllogement;
      this.stockimage = response[0];
      this.tabMessageFilter1 = this.stockimage
      console.log('liste all logement',this.tabMessageFilter);


      // this.tabMessageFilter1 = this.stockimage.map((logement: any) => {
      //   if (logement.image.length > 0) {
      //     return {
      //       ...logement,
      //       firstImage:
      //         'http://127.0.0.1:8000/storage/' + logement.image[0].nomImage,
      //     };
      //   }
      //   return logement;
      // });
    });
  }

  // logementType: boolean = false;

  // ChangeRole() {
  //   this.logementType = !this.logementType;
  // }


  logementType: any = "";

  checkbox1Checked: boolean = false;
  checkbox2Checked: boolean = false;

  checkOne(event: any) {
    this.checkbox1Checked = event.target.checked;
    if (this.checkbox1Checked) {
      this.logementType ="studio",
      this.checkbox2Checked = false;
    }
  }

  checkTwo(event: any) {
    this.checkbox2Checked = event.target.checked;
    if (this.checkbox2Checked) {
      this.logementType ="appartement",
      this.checkbox1Checked = false;
    }
  }

  // Fonction de recherche
  search() {

    console.log('vous avez cliqué sur le bouton ', this.logementType);
    console.log(
      'et vous avez selectionner la localite',
      this.searchCriteria.localite
    );


    this.tabMessageFilter1 = this.tabMessageFilter.filter(
      (elt: any) =>
        elt?.type.toLowerCase().includes(this.logementType.toLowerCase()) &&
        elt?.localite.toLowerCase().includes(this.searchCriteria.localite.toLowerCase())

    );
    // console.log("le logement trouve est ", this.tabMessageFilter1)

    return this.tabMessageFilter1

    // console.log("voici la recherche trouve",this.tabMessageFilter1)
    // console.log("pour le studio",this.searchCriteria.studio);
    // console.log("pour l'appartement", this.searchCriteria.appartement);
    // if (this.searchCriteria.studio===true) {
    // }
    // // Effectuez la recherche directement sur la liste existante
    // // searchResult:any = "";
    // this.tabMessageFilter1 = this.tabMessageFilter1.filter((logement: any) => {
    //   // Logique de filtrage (même logique que précédemment)
    //   const typeMatch =(!this.searchCriteria.type.studio || logement.type.toLowerCase() === 'studio') && (!this.searchCriteria.type.appartement ||  logement.type.toLowerCase() === 'appartement');
    //   const localiteMatch = logement.localite.toLowerCase().includes(this.searchCriteria.localite.toLowerCase());
    //   // Combiner toutes les conditions
    //   console.log("voici le logement trouve", typeMatch, localiteMatch)
    //   console.log('voici le logement trouve stocke dans le tableau', this.tabMessageFilter1);
    //   // searchResult = this.tabMessageFilter1;
    //   return typeMatch && localiteMatch;
    // });
  }
}
