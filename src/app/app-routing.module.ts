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

const routes: Routes = [
  /**-----------Routes pour la partie internaute----------------- */
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }, // Route par défaut
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
  { path: 'plan_du_site', component: PlanDuSiteComponent },

  // Route par défaut
  /**---------Fin Pour la definition des routes internaute-------------- */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
