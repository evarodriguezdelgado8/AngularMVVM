import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private baseUrl = 'http://localhost:3000/clientes';

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
  //   POST - Nuevo cliente
  // ==========================
  postData(cliente: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, cliente);
  }

  // ==========================
  //   PUT - Editar cliente
  // ==========================
  putData(id: number, cliente: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, cliente);
  }

  // ==========================
  //   DELETE - Borrar cliente
  // ==========================
  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
