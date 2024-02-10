import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Proprietaire } from 'src/app/models/Proprietaire';
import { AuthserviceService } from 'src/app/services/serviceauth/authservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  Userconnect: any;
  constructor(
    private authenfication: AuthserviceService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  affichestatut() {
    // this.usercon = localStorage.getItem('Userconnect');
    this.Userconnect = JSON.parse(localStorage.getItem('Userconnect') || '');
    // console.log("user status", this.usercon = localStorage.getItem('Userconnect'))
  }

  logout(): void {
    this.authenfication.logout().subscribe(
      (response) => {
        this.authenfication.isAuthenticated = false;
        localStorage.setItem(
          'Userconnect',
          JSON.stringify(this.authenfication.isAuthenticated)
        );
        this.affichestatut();
        console.log(response);
        // localStorage.clear();
        this.route.navigate(['/accueil']);
      },
      (error) => {
        console.error('Erreur lors de la déconnexion', error);
      }
    );
  }
}
