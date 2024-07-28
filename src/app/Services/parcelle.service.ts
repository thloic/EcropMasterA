import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parcelle } from '../Models/Parcelle';
import { ParcelleProducteurDto } from '../Models/ParcelleProducteurDto';

@Injectable({
  providedIn: 'root'
})
export class ParcelleService {

  private apiUrl = 'http://localhost:8080/api/parcelle'; // Assurez-vous que l'URL de base de votre API est correcte

  constructor(private http: HttpClient) { }

  createParcelle(parcelle: Parcelle): Observable<Parcelle> {
    return this.http.post<Parcelle>(`${this.apiUrl}/create`, parcelle);
  }

  getAllParcelles(producteurId: number): Observable<Parcelle[]> {
    return this.http.get<Parcelle[]>(`${this.apiUrl}/all`, { params: { producteurId: producteurId.toString() } });
  }

  getParcelleById(id: number): Observable<Parcelle> {
    return this.http.get<Parcelle>(`${this.apiUrl}/${id}`);
  }

  updateParcelle(id: number, parcelle: Parcelle): Observable<Parcelle> {
    return this.http.put<Parcelle>(`${this.apiUrl}/update/${id}`, parcelle);
  }

  deleteParcelle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  verifierRotationsCulturales(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/verifier-rotations`);
  }

  generateParcelleCode(parcelleProducteurDto:ParcelleProducteurDto): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/generateCode`, parcelleProducteurDto);
  }

  getProducteurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/producteurs`);
  }

  getCultures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cultures`);
  }
}
