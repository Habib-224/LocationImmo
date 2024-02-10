import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/serviceauth/authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  storedUsers: any;
  usersMat: any;
  constructor(private authservice: AuthserviceService, private route: Router) {}
  Userconnect: any;
  usercon: any;

  usercapt: any;
  userOnline: any;

  useronline_role: any = '';
  userStatut: any = '';

  //Annonce logement
  proprioEtudiant: boolean = true;

  ngOnInit(): void {
    this.userOnline = JSON.parse(localStorage.getItem('userOnline') || '');
    this.userStatut = JSON.parse(localStorage.getItem('Userconnect') || '');
    // console.log("statut du user",this.userStatut);
    this.useronline_role = this.userStatut;
    this.affichestatut();
  }

  RedirectConnect() {
    if (this.userStatut === false) {
      this.route.navigate(['/login']);
    } else {
      this.route.navigate(['/publier_Annonce']);
    }
  }

  affichestatut() {
    // this.usercon = localStorage.getItem('Userconnect');
    this.Userconnect = JSON.parse(localStorage.getItem('Userconnect') || '');
    // console.log("user status", this.usercon = localStorage.getItem('Userconnect'))
  }

  EspacePersonnelle() {
    let user = JSON.parse(localStorage.getItem('userOnline') || '');
    this.usercapt = user;
    this.userOnline = this.usercapt.user.role;
    if (this.userOnline == 'etudiant') {
      this.route.navigate(['/espace_personnelle_alerts']);
    } else {
      this.route.navigate(['/espace_personnelle_logement']);
    }
  }

  logout() {
    this.authservice.logout().subscribe((response) => {
      console.log(response);
      this.authservice.isAuthenticated = false;
      localStorage.setItem(
        'Userconnect',
        JSON.stringify(this.authservice.isAuthenticated)
      );
      this.affichestatut();
      this.route.navigate(['/accueil']);
    });
  }
}
