import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
  private apiUrl = 'http://localhost:3000/proyectos'; // URL de tu API
  private proyectosSujeto = new BehaviorSubject<Proyecto[]>([]);
  proyectos$ = this.proyectosSujeto.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de proyectos desde la API y actualiza el BehaviorSubject.
   */
  fetchProyectos(): void {
    this.http.get<Proyecto[]>(this.apiUrl).subscribe({
      next: (proyectos) => {
        this.proyectosSujeto.next(proyectos)
        console.log(proyectos);
      },
      error: (error) => console.error('Error al obtener proyectos:', error)
    });
  }
  

  /**
   * Obtiene un proyecto específico por su ID desde la API.
   */
  getProyectoById(id: number): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error al obtener el proyecto con id ${id}:`, error);
        throw error;
      })
    );
  }

  /**
   * Agrega un nuevo proyecto a través de la API y actualiza el BehaviorSubject.
   */
  addProyecto(proyecto: Proyecto): void {
    const proyectosActuales = this.proyectosSujeto.value;
  // Generar ID único para el proyecto
    proyecto.idP = proyectosActuales.length + 1;
    console.log(proyecto);
  // Enviar el proyecto al backend
    this.http.post<Proyecto>(this.apiUrl, proyecto).subscribe({
    next: (nuevoProyecto) => {
      this.proyectosSujeto.next([...proyectosActuales, nuevoProyecto]);
    },
    error: (error) => console.error('Error al agregar proyecto:', error)
  });
  }

  

  /**
   * Edita un proyecto existente en la API y actualiza el BehaviorSubject.
   */
  editProyecto(proyectoId: number, proyectoActualizado: Proyecto): void {
    this.http.put<Proyecto>(`${this.apiUrl}/${proyectoId}`, proyectoActualizado).subscribe({
      next: (proyectoModificado) => {
        const proyectosActuales = this.proyectosSujeto.value.map((proyecto) =>
          proyecto.idP === proyectoId ? proyectoModificado : proyecto
        );
        this.proyectosSujeto.next(proyectosActuales);
      },
      error: (error) => console.error(`Error al editar el proyecto con id ${proyectoId}:`, error)
    });
  }
  

  /**
   * Elimina un proyecto de la API y actualiza el BehaviorSubject.
   */
  removeProyecto(proyectoId: number): void {
    this.http.delete(`${this.apiUrl}/${proyectoId}`).subscribe({
      next: () => {
        const proyectosActuales = this.proyectosSujeto.value.filter(
          (proyecto) => proyecto.idP !== proyectoId
        );
        this.proyectosSujeto.next(proyectosActuales);
      },
      error: (error) => console.error(`Error al eliminar el proyecto con id ${proyectoId}:`, error)
    });
  }
  
}
