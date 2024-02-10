import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-espace',
  templateUrl: './sidebar-espace.component.html',
  styleUrls: ['./sidebar-espace.component.css'],
})
export class SidebarEspaceComponent implements OnInit {
  usercapt: any;
  userOnline: any;

  constructor(private route:Router){}
  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('userOnline') || '');
    this.usercapt = user;
    this.userOnline = this.usercapt.user.role;
    // console.log('utilisateur en line', this.userOnline);
  }

  returnAccueil() {
    this.route.navigate(['/'])
  }
}
