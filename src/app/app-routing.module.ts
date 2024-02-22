import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/espace_internaute/home/home.component';
import { LouerComponent } from './components/espace_internaute/louer/louer.component';
import { ContactComponent } from './components/espace_internaute/contact/contact.component';
import { AProposComponent } from './components/espace_internaute/a-propos/a-propos.component';
import { AuthentificationComponent } from './components/security/authentification/authentification.component';
import { CommunauteComponent } from './components/espace_internaute/communaute/communaute.component';
import { AnnoncesComponent } from './components/espace_internaute/annonces/annonces.component';
import { PolitiqueConfidentialiteComponent } from './components/espace_internaute/politique-confidentialite/politique-confidentialite.component';
import { MentionLegaleComponent } from './components/espace_internaute/mention-legale/mention-legale.component';
import { PlanDuSiteComponent } from './components/espace_internaute/plan-du-site/plan-du-site.component';
import { StatistiqueComponent } from './components/admin/statistique/statistique.component';
import { GestionUtilisateursComponent } from './components/admin/gestion-utilisateurs/gestion-utilisateurs.component';
import { GestionAnnoncesComponent } from './components/admin/gestion-annonces/gestion-annonces.component';
import { GestionLocalitesComponent } from './components/admin/gestion-localites/gestion-localites.component';
import { GestionAlertsComponent } from './components/admin/gestion-alerts/gestion-alerts.component';
import { AlertsComponent } from './components/espace_internaute/alerts/alerts.component';
import { DetailAnnonceComponent } from './components/espace_internaute/detail-annonce/detail-annonce.component';
import { EspacePersoComponent } from './components/internautes/espace-perso/espace-perso.component';
import { EspacePersonnelleAlertsComponent } from './components/internautes/espace-personnelle-alerts/espace-personnelle-alerts.component';
import { EspacePersonnelleProfilComponent } from './components/internautes/espace-personnelle-profil/espace-personnelle-profil.component';
import { EspacePersonnelleLogementsComponent } from './components/internautes/espace-personnelle-logements/espace-personnelle-logements.component';
import { MessageComponent } from './components/internautes/message/message.component';
import { ProprioProfilComponent } from './components/internautes/proprio-profil/proprio-profil.component';
import { ErrorComponent } from './components/espace_internaute/error/error.component';
import { adminGuard } from './guards/admin.guard';
import { etudiantGuard } from './guards/etudiant.guard';
import { proprietaireGuard } from './guards/proprietaire.guard';

const routes: Routes = [
  /**-----------Routes pour la partie internaute----------------- */

  { path: 'accueil', component: HomeComponent },
  { path: 'louer', component: LouerComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'a-propos', component: AProposComponent },
  { path: 'login', component: AuthentificationComponent },
  { path: 'communaute', component: CommunauteComponent },
  { path: 'publier_Annonce', component: AnnoncesComponent },
  {
    path: 'politique_confidentialite',
    component: PolitiqueConfidentialiteComponent,
  },
  { path: 'mention_legale', component: MentionLegaleComponent },
  { path: 'detail-annonce/:id', component: DetailAnnonceComponent },
  { path: 'plan_du_site', component: PlanDuSiteComponent },
  { path: 'alert', component: AlertsComponent },

  /**---------Fin Pour la definition des routes internaute-------------- */

  /**----------------Route pour la partie Administrateur-----------------*/
  {
    path: 'dashboard_statistic',
    component: StatistiqueComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'dashboard_utilisateurs',
    component: GestionUtilisateursComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'dashboard_annonces',
    component: GestionAnnoncesComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'dashboard_alerts',
    component: GestionAlertsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'dashboard_localites',
    component: GestionLocalitesComponent,
    canActivate: [adminGuard],
  },

  /**----------------Fin pour la partie Administrateur-----------------*/

  //--------Pour la partie Espace Perso de l'etudiant */
  {
    path: 'espace_personnelle',
    component: EspacePersoComponent,
    canActivate: [etudiantGuard],
  },
  {
    path: 'espace_personnelle_alerts',
    component: EspacePersonnelleAlertsComponent,
    canActivate: [etudiantGuard],
  },
  {
    path: 'espace_personnelle_profil',
    component: EspacePersonnelleProfilComponent,
    canActivate: [etudiantGuard],
  },
  //--------Fin pour la partie Espace Perso de l'etudiant--------------*/

  //-----------Debut proprietaire-------------------
  {
    path: 'espace_personnelle_logement',
    component: EspacePersonnelleLogementsComponent,
    canActivate: [proprietaireGuard],
  },
  {
    path: 'espace_personnelle_message',
    component: MessageComponent,
    canActivate: [proprietaireGuard],
  },

  {
    path: 'espace_personnelle_proprioProfil',
    component: ProprioProfilComponent,
    canActivate: [proprietaireGuard],
  },
  //---------Fin route Proprietaire-----------------
  /**Fin pour la partie Espace Perso de l'etudiant */

  { path: '', redirectTo: '/accueil', pathMatch: 'full' }, // Route par défaut
  { path: '**', component: ErrorComponent }, // Cette route doit être définie à la fin
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
