import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../UrlApi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhatsAppService {
  constructor(private http: HttpClient) { }

  userconnect = JSON.parse(localStorage.getItem('userOnline') || '');

  redirectWhatsapp(phoneNumber: string): void {
    const whatsappLink = `https://wa.me/${phoneNumber}`;
    // Redirige l'utilisateur vers WhatsApp
      window.open(whatsappLink, '_blank');
  }
}
