import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocaliteService } from 'src/app/services/localites/localite.service';
import { UtilisateurserviceService } from 'src/app/services/utilisateur/utilisateurservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  tailleuser: any;
  constructor(private http: HttpClient, private utilisateurService: UtilisateurserviceService,private localite: LocaliteService) { }
  ngOnInit(): void {
    this.getUserLength();
  }

  getUserLength() {
    this.utilisateurService.getAllUsers().subscribe((response) => {
      this.tailleuser = response.data.length;
    })
  }
}
