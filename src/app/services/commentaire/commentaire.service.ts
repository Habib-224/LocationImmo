import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../UrlApi';
import { Observable } from 'rxjs';
import { Commentaire } from 'src/app/models/Commentaire';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  constructor(private http: HttpClient) { }

  UserCommentaire(commentaire: Commentaire): Observable<Commentaire>{
    return this.http.post<Commentaire>(`${url}ajoutCommentaire`,commentaire);
  }
}
