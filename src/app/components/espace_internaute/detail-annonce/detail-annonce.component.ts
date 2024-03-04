import { JsonPipe } from '@angular/common';
import { FunctionExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commentaire } from 'src/app/models/Commentaire';
import { Proprietaire } from 'src/app/models/Proprietaire';
import { CommentaireService } from 'src/app/services/commentaire/commentaire.service';
import { LogementService } from 'src/app/services/logement/logement.service';
import { MessageService } from 'src/app/services/message/message.service';
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

  commentaireText: any = '';

  userOnline: any;

  constructor(
    private route: ActivatedRoute,
    private logementService: LogementService,
    private utilisateurService: UtilisateurserviceService,
    private WhatsApp: WhatsAppService,
    private serviceCommentaire: CommentaireService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.idLogement = id;
    });

    this.getAllLogement();

    const user = JSON.parse(localStorage.getItem('userOnline') || '');
    this.userOnline = user.user;
    console.log(this.userOnline);

    const proprietaire = JSON.parse(localStorage.getItem('proprietaire') || '');
    this.listeProprio = proprietaire;
  }

  image: any = [];
  commentaireLogement: any = [];
  tailleCommentaire: any;
  getAllLogement() {
    this.logementService
      .getdetailLogement(this.idLogement)
      .subscribe((response) => {
        let detaillogement = response.data[0];
        console.log('voici les detail du logement', detaillogement);
        this.detail_logement = detaillogement;
        this.mailProprio = this.detail_logement.proprietaireEmail;
        this.tailleimagelogement = detaillogement.image.length;
        this.commentaireLogement = this.detail_logement.commentaire;
        this.tailleCommentaire = this.detail_logement.commentaire.length;
        console.log('taille logement', this.tailleCommentaire);
        this.image = detaillogement.image;
        // console.log('voici les detail du image seulement', this.image);
        // console.log('voici les commentaires seulement', this.commentaireLogement);

        let founduser = this.listeProprio.find(
          (utilisateur: any) => utilisateur.user.email === this.mailProprio
        );
        if (founduser) {
          // console.log('trouve', founduser);
          this.userfoundnumero = founduser.user.telephone;
          // console.log('numero trouve', this.userfoundnumero);
        } else {
          console.log('non trouve');
        }

        if (this.tailleimagelogement == 1) {
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
              console.log('logement dfd', this.detail_logement.image);
              return logement;
            }
          );
        }

        if (this.tailleimagelogement == 2) {
          this.tabMessageFilter1 = this.detail_logement.image.map(
            (logement: any) => {
              if (this.detail_logement.image.length > 0) {
                return {
                  ...logement,
                  firstImage:
                    'http://127.0.0.1:8000/storage/' +
                    this.detail_logement.image[0].nomImage,

                  secondImage:
                    'http://127.0.0.1:8000/storage/' +
                    this.detail_logement.image[1].nomImage,
                };
              }
              console.log('logement hjkh', this.detail_logement.image);
              return logement;
            }
          );
        }

        if (this.tailleimagelogement == 3) {
          this.tabMessageFilter1 = this.detail_logement.image.map(
            (logement: any) => {
              if (this.detail_logement.image.length > 0) {
                return {
                  ...logement,
                  firstImage:
                    'http://127.0.0.1:8000/storage/' +
                    this.detail_logement.image[0].nomImage,

                  secondImage:
                    'http://127.0.0.1:8000/storage/' +
                    this.detail_logement.image[1].nomImage,
                  thirdImage:
                    'http://127.0.0.1:8000/storage/' +
                    this.detail_logement.image[2].nomImage,
                };
              }
              console.log('logement hjkh', this.detail_logement.image);
              return logement;
            }
          );
        }
      });
  }

  redirectToWhatsapp(): void {
    const phoneNumber = this.userfoundnumero;
    this.WhatsApp.redirectWhatsapp(phoneNumber);
  }

  CommentaireUser() {
    const commentaireUser = new Commentaire();
    commentaireUser.texte = this.commentaireText;
    commentaireUser.logement_id = this.idLogement;

    this.serviceCommentaire.UserCommentaire(commentaireUser).subscribe(
      (response: any) => {
        console.log('la reponse ', response);
        this.commentaireText = '';
        this.message.MessageSucces(
          'Success',
          'Success',
          'Votre Commentaire a ete ajouté avec succès',
          'center'
        );
        this.getAllLogement();
      },
      (error: any) => {
        console.log('la reponse ', error);
      }
    );
  }
}
