import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private proyectosSujeto = new BehaviorSubject<Proyecto[]>([]);
  proyectos$ = this.proyectosSujeto.asObservable();

  getProyectos(): Proyecto[] {
    return this.proyectosSujeto.value;
  }

  addProyecto(proyecto: Proyecto): void {
    const proyectosActuales = this.proyectosSujeto.value;
    this.proyectosSujeto.next([...proyectosActuales, proyecto]);
  }

  removeProyecto(proyectoId: number): void {
    const proyectosActuales = this.proyectosSujeto.value;
    const proyectosActualizados = proyectosActuales.filter(proyecto => proyecto.idP !== proyectoId);
    this.proyectosSujeto.next(proyectosActualizados);
  }

  editProyecto(proyectoId: number, proyectoActualizado: Proyecto): void {
    const proyectosActuales = this.proyectosSujeto.value;
    const proyectosActualizados = proyectosActuales.map(proyecto =>
      proyecto.idP === proyectoId ? { ...proyecto, ...proyectoActualizado } : proyecto
    );
    this.proyectosSujeto.next(proyectosActualizados);
  }
}
