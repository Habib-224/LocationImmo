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
  constructor(private authenfication: AuthserviceService, private route:Router) {}

  ngOnInit(): void {}

  logout(): void {
    this.authenfication.logout().subscribe(
      (response) => {

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
