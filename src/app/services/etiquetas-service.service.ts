import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Etiqueta } from '../models/etiqueta';

@Injectable({
  providedIn: 'root',
})
export class EtiquetasService {
  private apiUrl = 'http://localhost:3000/etiquetas'; // URL de tu API
  private etiquetasSujeto = new BehaviorSubject<Etiqueta[]>([]);
  etiquetas$ = this.etiquetasSujeto.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de etiquetas desde la API y actualiza el BehaviorSubject.
   */
  fetcheEtiquetas(): void {
    this.http.get<Etiqueta[]>(this.apiUrl).subscribe({
      next: (etiquetas) => {
        this.etiquetasSujeto.next(etiquetas)
        console.log(etiquetas);
      },
      error: (error) => console.error('Error al obtener etiquetas:', error)
    });
  }
  

  /**
   * Obtiene un etiqueta específico por su ID desde la API.
   */
  getEtiquetaById(id: number): Observable<Etiqueta> {
    return this.http.get<Etiqueta>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error al obtener el etiqueta con id ${id}:`, error);
        throw error;
      })
    );
  }

  /**
   * Agrega un nuevo etiqueta a través de la API y actualiza el BehaviorSubject.
   */
  addEtiqueta(etiqueta: Etiqueta): void {
    const etiquetasActuales = this.etiquetasSujeto.value;
  // Generar ID único para el etiqueta
    etiqueta.idE = etiquetasActuales.length + 1;
    console.log(etiqueta);
  // Enviar el etiqueta al backend
    this.http.post<Etiqueta>(this.apiUrl, etiqueta).subscribe({
    next: (nuevoEtiqueta) => {
      this.etiquetasSujeto.next([...etiquetasActuales, nuevoEtiqueta]);
    },
    error: (error) => console.error('Error al agregar etiqueta:', error)
  });
  }

  

  /**
   * Edita un etiqueta existente en la API y actualiza el BehaviorSubject.
   */
  editEtiqueta(etiquetaId: number, etiquetaActualizado: Etiqueta): void {
    this.http.put<Etiqueta>(`${this.apiUrl}/${etiquetaId}`, etiquetaActualizado).subscribe({
      next: (etiquetaModificado) => {
        const etiquetasActuales = this.etiquetasSujeto.value.map((etiqueta) =>
          etiqueta.idE === etiquetaId ? etiquetaModificado : etiqueta
        );
        this.etiquetasSujeto.next(etiquetasActuales);
      },
      error: (error) => console.error(`Error al editar el etiqueta con id ${etiquetaId}:`, error)
    });
  }
  

  /**
   * Elimina un etiqueta de la API y actualiza el BehaviorSubject.
   */
  removeEtiqueta(etiquetaId: number): void {
    this.http.delete(`${this.apiUrl}/${etiquetaId}`).subscribe({
      next: () => {
        const etiquetasActuales = this.etiquetasSujeto.value.filter(
          (etiqueta) => etiqueta.idE !== etiquetaId
        );
        this.etiquetasSujeto.next(etiquetasActuales);
      },
      error: (error) => console.error(`Error al eliminar el etiqueta con id ${etiquetaId}:`, error)
    });
  }
  
}
