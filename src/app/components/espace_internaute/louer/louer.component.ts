import { Component, OnInit } from '@angular/core';
import { LogementService } from 'src/app/services/logement/logement.service';
import { Loading, Notify } from 'notiflix';

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
      this.tabMessageFilter1 = this.stockimage;
      // console.log('liste all logement',this.tabMessageFilter);
    });
  }

  logementType: any = '';

  checkbox1Checked: boolean = false;
  checkbox2Checked: boolean = false;

  checkOne(event: any) {
    this.checkbox1Checked = event.target.checked;
    if (this.checkbox1Checked) {
      (this.logementType = 'studio'), (this.checkbox2Checked = false);
    }
  }

  checkTwo(event: any) {
    this.checkbox2Checked = event.target.checked;
    if (this.checkbox2Checked) {
      (this.logementType = 'appartement'), (this.checkbox1Checked = false);
    }
  }

  // Fonction de recherche
  search() {
    // Loading.pulse();
    this.tabMessageFilter1 = this.tabMessageFilter.filter(
      (elt: any) =>
        elt?.type.toLowerCase().includes(this.logementType.toLowerCase()) &&
        elt?.localite
          .toLowerCase()
          .includes(this.searchCriteria.localite.toLowerCase())
    );
    // Loading.remove();
    return this.tabMessageFilter1;

  }

}
