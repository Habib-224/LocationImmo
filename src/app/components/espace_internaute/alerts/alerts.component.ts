import { Component, OnInit } from '@angular/core';
import { AlerteService } from 'src/app/services/alertes/alerte.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements OnInit {
  constructor(private alertService: AlerteService) { }
  listAlert: any[] = [];
  ngOnInit(): void {
    this.getAllAlert();
  }

  getAllAlert() {
    this.alertService.getAllAlerts().subscribe((response) => {
      console.log(response.data);
      this.listAlert = response.data;
    
    })
  }
}
