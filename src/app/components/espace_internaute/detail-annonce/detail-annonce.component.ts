import { JsonPipe } from '@angular/common';
import { FunctionExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proprietaire } from 'src/app/models/Proprietaire';
import { LogementService } from 'src/app/services/logement/logement.service';
import { UtilisateurserviceService } from 'src/app/services/utilisateur/utilisateurservice.service';
import { WhatsAppService } from 'src/app/services/whatsApp/whats-app.service';
@Component({
  selector: 'app-detail-annonce',
  templateUrl: './detail-annonce.component.html',
  styleUrls: ['./detail-annonce.component.css'],
})
export class DetailAnnonceComponent implements OnInit {
  idLogement: any;
  logement: any = [];
  detail_logement: any = [];
  tabMessageFilter1: any = [];
  logdet: any = [];
  mailProprio: any;
  userfoundnumero: any;
  listeProprio: any[0];
  tailleimagelogement: any;

  constructor(
    private route: ActivatedRoute,
    private logementService: LogementService,
    private utilisateurService: UtilisateurserviceService,
    private WhatsApp: WhatsAppService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.idLogement = id;
    });

    this.getAllLogement();

    const proprietaire = JSON.parse(localStorage.getItem('proprietaire') || '');
    this.listeProprio = proprietaire;
  }


  getAllLogement() {
    this.logementService
      .getdetailLogement(this.idLogement)
      .subscribe((response) => {
        let detaillogement = response.data[0];
        this.detail_logement = detaillogement;
        this.mailProprio = this.detail_logement.proprietaireEmail;
        this.tailleimagelogement = detaillogement.image.length;

        let founduser = this.listeProprio.find(
          (utilisateur: any) => utilisateur.user.email === this.mailProprio
        );
        if (founduser) {
          console.log('trouve', founduser);
          this.userfoundnumero = founduser.user.telephone;
          console.log('numero trouve', this.userfoundnumero);
        } else {
          console.log('non trouve');
        }

        this.tabMessageFilter1 = this.detail_logement.image.map(
          (logement: any) => {
            if (this.detail_logement.image.length > 0) {
              return {
                ...logement,
                firstImage:
                  'http://127.0.0.1:8000/storage/' +
                  this.detail_logement.image[0].nomImage,
              };
            }
            return logement;
          }
        );
      });
  }

  redirectToWhatsapp(): void {
    const phoneNumber = this.userfoundnumero;
    this.WhatsApp.redirectWhatsapp(phoneNumber);
  }
}
