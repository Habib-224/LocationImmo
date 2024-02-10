import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlerteService } from 'src/app/services/alertes/alerte.service';
import { LocaliteService } from 'src/app/services/localites/localite.service';
import { LogementService } from 'src/app/services/logement/logement.service';
import { UtilisateurserviceService } from 'src/app/services/utilisateur/utilisateurservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  tailleuser: any;
  tailleLogement: any;
  tailleAlert: any;
  constructor(
    private http: HttpClient,
    private utilisateurService: UtilisateurserviceService,
    private localite: LocaliteService,
    private logementService: LogementService,
    private alertService: AlerteService
  ) {}
  ngOnInit(): void {
    this.getUserLength();
    this.getLogementLength();
    this.getAlertLength();
  }

  getUserLength() {
    this.utilisateurService.getAllUsers().subscribe((response) => {
      this.tailleuser = response.data.length;
    });
  }

  getLogementLength() {
    this.logementService.getAlllogment().subscribe((response) => {
      // console.log('taille des logements', response[0].length);
      this.tailleLogement = response[0].length;
    });
  }

  getAlertLength() {
    this.alertService.getAllAlerts().subscribe((response) => {
      // console.log('taille des alerts', response.data.length);
      this.tailleAlert = response.data.length;
    });
  }
}
