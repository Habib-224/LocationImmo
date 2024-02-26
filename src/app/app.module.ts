import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/espace_internaute/home/home.component';
import { LouerComponent } from './components/espace_internaute/louer/louer.component';
import { ProposerBienComponent } from './components/espace_internaute/proposer-bien/proposer-bien.component';
import { CommunauteComponent } from './components/espace_internaute/communaute/communaute.component';
import { AnnoncesComponent } from './components/espace_internaute/annonces/annonces.component';
import { AProposComponent } from './components/espace_internaute/a-propos/a-propos.component';
import { ContactComponent } from './components/espace_internaute/contact/contact.component';
import { PlanDuSiteComponent } from './components/espace_internaute/plan-du-site/plan-du-site.component';
import { MentionLegaleComponent } from './components/espace_internaute/mention-legale/mention-legale.component';
import { PolitiqueConfidentialiteComponent } from './components/espace_internaute/politique-confidentialite/politique-confidentialite.component';
import { AuthentificationComponent } from './components/security/authentification/authentification.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthserviceService } from './services/serviceauth/authservice.service';
import { AuthInterceptor } from './interceptors/interceptor';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { SidebarComponent } from './components/admin/layoutsAdmin/sidebar/sidebar.component';
import { NavbarComponent } from './components/admin/layoutsAdmin/navbar/navbar.component';
import { StatistiqueComponent } from './components/admin/statistique/statistique.component';
import { GestionUtilisateursComponent } from './components/admin/gestion-utilisateurs/gestion-utilisateurs.component';
import { GestionAnnoncesComponent } from './components/admin/gestion-annonces/gestion-annonces.component';
import { GestionAlertsComponent } from './components/admin/gestion-alerts/gestion-alerts.component';
import { GestionLocalitesComponent } from './components/admin/gestion-localites/gestion-localites.component';
import { EspacePersoComponent } from './components/internautes/espace-perso/espace-perso.component';
import { AlertsComponent } from './components/espace_internaute/alerts/alerts.component';
import { DetailAnnonceComponent } from './components/espace_internaute/detail-annonce/detail-annonce.component';
import { SidebarEspaceComponent } from './components/internautes/layoutEspace/sidebar-espace/sidebar-espace.component';
import { NavbarEspaceComponent } from './components/internautes/layoutEspace/navbar-espace/navbar-espace.component';
import { EspacePersonnelleAlertsComponent } from './components/internautes/espace-personnelle-alerts/espace-personnelle-alerts.component';
import { EspacePersonnelleProfilComponent } from './components/internautes/espace-personnelle-profil/espace-personnelle-profil.component';
import { EspacePersonnelleLogementsComponent } from './components/internautes/espace-personnelle-logements/espace-personnelle-logements.component';
import { MessageComponent } from './components/internautes/message/message.component';
import { ProprioProfilComponent } from './components/internautes/proprio-profil/proprio-profil.component';
import { ErrorComponent } from './components/espace_internaute/error/error.component';
import { GestionDemandesComponent } from './components/admin/gestion-demandes/gestion-demandes.component';
import { GestionNewsletterComponent } from './components/admin/gestion-newsletter/gestion-newsletter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LouerComponent,
    ProposerBienComponent,
    CommunauteComponent,
    AnnoncesComponent,
    AProposComponent,
    ContactComponent,
    PlanDuSiteComponent,
    MentionLegaleComponent,
    PolitiqueConfidentialiteComponent,
    AuthentificationComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    StatistiqueComponent,
    GestionUtilisateursComponent,
    GestionAnnoncesComponent,
    GestionAlertsComponent,
    GestionLocalitesComponent,
    EspacePersoComponent,
    AlertsComponent,
    DetailAnnonceComponent,
    SidebarEspaceComponent,
    NavbarEspaceComponent,
    EspacePersonnelleAlertsComponent,
    EspacePersonnelleProfilComponent,
    EspacePersonnelleLogementsComponent,
    MessageComponent,
    ProprioProfilComponent,
    ErrorComponent,
    GestionDemandesComponent,
    GestionNewsletterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    AuthserviceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
