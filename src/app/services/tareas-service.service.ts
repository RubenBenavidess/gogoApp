import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private TareasSujeto = new BehaviorSubject<Tarea[]>([]);
    Tareas$ = this.TareasSujeto.asObservable();
  
    getTareas(): Tarea[] {
      return this.TareasSujeto.value;
    }
  
    addTarea(Tarea: Tarea): void {
      const TareasActuales = this.TareasSujeto.value;
      this.TareasSujeto.next([...TareasActuales, Tarea]);
    }
  
    removeTarea(TareaId: number): void {
      const TareasActuales = this.TareasSujeto.value;
      const TareasActualizados = TareasActuales.filter(Tarea => Tarea.idT !== TareaId);
      this.TareasSujeto.next(TareasActualizados);
    }
  
    editTarea(TareaId: number, TareaActualizado: Tarea): void {
      const TareasActuales = this.TareasSujeto.value;
      const TareasActualizados = TareasActuales.map(Tarea =>
        Tarea.idT === TareaId ? { ...Tarea, ...TareaActualizado } : Tarea
      );
      this.TareasSujeto.next(TareasActualizados);
    }
}
