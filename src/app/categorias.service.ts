import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private baseUrl = 'http://localhost:3000/categorias';

  constructor(private http: HttpClient) {}

  // ==========================
  //   GET - Obtener lista
  // ==========================
  getData(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // ==========================
  //   GET BY ID
  // ==========================
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // ==========================
  //   POST - Nuevo categoria
  // ==========================
  postData(categoria: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, categoria);
  }

  // ==========================
  //   PUT - Editar categoria
  // ==========================
  putData(id: number, categoria: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, categoria);
  }

  // ==========================
  //   DELETE - Borrar categoria
  // ==========================
  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
