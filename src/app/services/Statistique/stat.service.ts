import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../UrlApi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http: HttpClient) { }
}
