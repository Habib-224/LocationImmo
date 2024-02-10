import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../UrlApi';
import { Alert } from 'src/app/models/Alert';

@Injectable({
  providedIn: 'root',
})
export class AlerteService {
  constructor(private http: HttpClient) {}

  getAllAlerts(): Observable<any> {
    return this.http.get<any>(`${url}annonces`);
  }

  registerAlert(alert: Alert, onSuccess: Function, onError: Function) {
    return this.http.post(`${url}ajoutAnnonce`, alert).subscribe(
      (response: any) => onSuccess(response),
      (error: any) => onError(error)
    );
  }

  PriseEnChargeAlert(id: number,alert: Alert): Observable<Alert>{
    return this.http.put<Alert>(`${url}marquerPrisEncharge/${id}`,alert);
  }


  deleteAlert(id: number,alert: Alert): Observable<Alert> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<Alert>(`${url}annonces/${id}`, { params });
  }

  updateAlert(id: number, alert: Alert): Observable<Alert>{
    return this.http.put<Alert>(`${url}annonces/${id}`, alert);
  }

  getAllertByUser(): Observable<any>{
    return this.http.get<any>(`${url}AnnonceEtudiant`);
  }
}
