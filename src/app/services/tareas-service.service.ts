// Servicio de tareas corregido
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  private apiUrl = 'http://localhost:3000/proyectos';

  constructor(private http: HttpClient) {}

  // Obtener todas las tareas de un proyecto
  getTareas(idP: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.apiUrl}/${idP}/tareas`);
  }

  // Agregar una tarea a un proyecto
  addTarea(idP: number, tarea: Tarea): void {
      this.http.post<Tarea>(`${this.apiUrl}/${idP}/tareas`, tarea)
      .subscribe({
        next: (tarea)=>{},
        error: (error) => console.error('Error al crear tarea:', error)
      });
  };
  

  // Actualizar una tarea dentro de un proyecto
  updateTarea(idP: number, idT: number, tarea: Tarea): void {
    console.log(`${this.apiUrl}/${idP}/tareas/${idT}`);
    this.http.put<Tarea>(
      `${this.apiUrl}/${idP}/tareas/${idT}`, tarea
    ).subscribe({
        next: (tarea)=>{},
        error: (error) => console.error('Error al actualizar tarea:', error)
      });
  }

  // Eliminar una tarea dentro de un proyecto
  deleteTarea(idP: number, idT: number): Observable<Tarea> {
    return this.http.delete<Tarea>(`${this.apiUrl}/${idP}/tareas/${idT}`);
  }
}