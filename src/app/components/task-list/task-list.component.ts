import { Component, Input } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, Button],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  @Input() tareas: Tarea[] = [];
  tareasFiltradas: Tarea[] = [];
  tareasAgrupadas: Tarea[][] = [];
  estado = {
    pendiente: false,
    enCurso: false,
    completado: false
  };
  agrupacion = {
    prioridad: false
  };
  filtrado: boolean = false;
  agrupado: boolean = false;
  actual = new Date();
  prioridades: string[] = [];


  cargarPrioridades(){
    for(let tarea of this.tareas){
      if(!this.prioridades.includes(tarea.prioridad)){
        this.prioridades.push(tarea.prioridad);
      }
    }
  }

  limpiarFiltradas(tareasFiltro: Tarea[]){
    tareasFiltro = [];  
  }

  limpiarAgrupadas(){
    this.tareasAgrupadas = [];
  }

  filtrarTareas(tareasFiltro: Tarea[], tareas: Tarea[]) {

    this.limpiarFiltradas(tareasFiltro);
  
    if (!this.estado.pendiente && !this.estado.enCurso && !this.estado.completado) {
      tareasFiltro.splice(0, tareasFiltro.length, ...tareas);
    } else {
      let nuevasTareas: Tarea[] = [];
  
      if (this.estado.pendiente) {
        nuevasTareas = nuevasTareas.concat(tareas.filter((tarea) => tarea.fechaInicio > this.actual && !tarea.completado));
      }
    
      if (this.estado.enCurso) {
        nuevasTareas = nuevasTareas.concat(tareas.filter(tarea => this.actual > tarea.fechaInicio && this.actual < tarea.fechaFin && !tarea.completado));
      }
    
      if (this.estado.completado) {
        nuevasTareas = nuevasTareas.concat(tareas.filter(tarea => this.actual > tarea.fechaFin && tarea.completado));
      }
  
      tareasFiltro.splice(0, tareasFiltro.length, ...nuevasTareas); 
    }

  }

  filtrarAgrupadas(){
    for(let tareas of this.tareasAgrupadas){
      this.filtrarTareas(tareas, tareas);
    }
  }

  agruparTareas(){
    console.log(this.agrupacion.prioridad);
    this.limpiarAgrupadas();
    this.cargarPrioridades();
    for(let prioridad of this.prioridades){
      this.tareasAgrupadas.push(this.tareas.filter(tarea => tarea.prioridad == prioridad));
    }
    if(this.estado.pendiente || this.estado.enCurso || this.estado.completado){
      this.filtrarAgrupadas();
    }   
  }

  getColaboradores(tarea: Tarea){
    let colaboradores = '';
    for (let colaborador of tarea.colaboradores) {
        colaboradores += '\n' + colaborador.nombreC;
    }
    console.log(colaboradores);
    return colaboradores;
  }

  getEtiquetas(tarea: Tarea){
    let etiquetas = '';
    for (let etiqueta of tarea.etiquetas) {
        etiquetas += '\n' + etiqueta.nombreE;
    }
    return etiquetas;
  }

}
