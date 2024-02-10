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
    // this.produitDetails = this.produits.find(product => product.Productid === this.produitId);

    // Utilisation de paramMap pour accéder aux paramètres de la route
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.idLogement = id;
      // console.log("l'id selectionner est :", this.idLogement);
    });
    this.getAllLogement();

    const proprietaire = JSON.parse(localStorage.getItem('proprietaire') || '');
    this.listeProprio = proprietaire;

    console.log('liste des proprio', proprietaire);
  }

  // getAllUser() {
  //   this.utilisateurService.getProprietaire().subscribe((response) => {
  //     console.log("la liste des proprietaire",response)
  //   })
  // }

  getAllLogement() {
    this.logementService
      .getdetailLogement(this.idLogement)
      .subscribe((response) => {
        let detaillogement = response.data[0];
        this.detail_logement = detaillogement;
        this.mailProprio = this.detail_logement.proprietaireEmail;
        // console.log("detail du logement taille", detaillogement.image.length);
        this.tailleimagelogement = detaillogement.image.length;
        console.log("la taille du logement", this.tailleimagelogement);
        // console.log('le mail du proprietaire est :', this.mailProprio);

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
        // console.log(detail);
        // console.log("detail logement",detail[0].id);
        // for (let i = 0; i < detail.length; i++) {
        //   // console.log(i);
        //   if (detail[i].id == this.idLogement) {
        //     this.detail_logement = detail[i];
        //     console.log('logement trouve', this.detail_logement);
        //     break;
        //   } else {
        //     // console.log("non je l'ai pas trouve");
        //   }
        // }
        // console.log('voici les details de mon logements', this.detail_logement);

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

  // getWhatsAppByUser(id: number) {
  //   this.WhatsApp.ContactWhatsApp(id).subscribe(
  //     (response) => {
  //       // Traitez la réponse ici si nécessaire
  //       console.log('gestion des reponse', response);
  //     },
  //     (error) => {
  //       // Gérez les erreurs ici
  //       console.error('gestion des erreurs', error);
  //     }
  //   );
  // }
}
