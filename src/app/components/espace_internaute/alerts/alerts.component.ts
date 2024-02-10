import { Component, OnInit } from '@angular/core';
import { AlerteService } from 'src/app/services/alertes/alerte.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements OnInit {
  constructor(private alertService: AlerteService) {}

  listAlert: any[] = [];
  selectedPrice: any;
  filteredAlerts: any[] = [];
  allAlert: any[] = [];

  ngOnInit(): void {
    this.getAllAlert();
  }

  getAllAlert() {
    this.alertService.getAllAlerts().subscribe((response) => {
      this.listAlert = response.data;
      console.log(this.listAlert);
      this.allAlert = this.listAlert;
      this.filteredAlerts = this.allAlert; // Initialisation de filteredAlerts
    });
  }

  detailAlert(id: any) {
    alert(id);
  }
  // selectedPrice: any;

  filterAlerts() {
    if (!this.selectedPrice) {
      this.filteredAlerts = this.allAlert;
    } else {
      this.filteredAlerts = this.allAlert.filter(
        (alert: any) => alert.budget <= parseInt(this.selectedPrice)
      );
    }
  }
}
