import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Culture } from '../Models/Culture';

@Injectable({
  providedIn: 'root'
})
export class CultureService {
  private apiUrl = 'http://localhost:8080/api/culture';

  constructor(private http: HttpClient) { }

  enregistrerCulture(formData: FormData): Observable<Culture> {
    return this.http.post<Culture>(`${this.apiUrl}/create`, formData);
  }


  getCultures(): Observable<Culture[]> {
    console.log('Récupération des cultures depuis le service...');
    return this.http.get<Culture[]>(`${this.apiUrl}/list`);
  }

  supprimerCulture(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
