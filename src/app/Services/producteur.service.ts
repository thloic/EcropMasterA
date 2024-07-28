import { Injectable } from '@angular/core';
import { Producteur } from '../Models/Producteur';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProducteurService {
  private apiUrl = 'http://localhost:8080/api/producteur'; // Correction de l'URL

  constructor(private http: HttpClient) {}

  enregistrerProducteur(producteur: Producteur): Observable<Producteur> {
    return this.http.post<Producteur>(`${this.apiUrl}/create`, producteur);
  }

  getProducteurs(): Observable<Producteur[]> {
    console.log('Récupération des producteurs depuis le service...');
    return this.http.get<Producteur[]>(`${this.apiUrl}/all`);
  }
  supprimerProducteur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
