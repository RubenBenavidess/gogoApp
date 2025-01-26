import { Component, Input } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { FormsModule } from '@angular/forms';
import { TagPickerComponent } from '../tag-picker/tag-picker.component';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, ProgressBarModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent {
  @Input() idP: number = 0;
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
  etiquetado: boolean = false;
  actual = new Date();
  prioridades: string[] = [];

  calcularProgreso(tarea: Tarea){
    let fechaInicio = new Date(tarea.fechaInicio);
    let fechaFin = new Date(tarea.fechaFin);
    let actual = new Date();
    let porcentaje = 0;

    if(tarea.completado){
      porcentaje = 100;
    } else if(actual < fechaInicio){
      porcentaje = 0;
    } else if(actual > fechaFin){
      porcentaje = 100;
    } else {
      let tiempoTotal = fechaFin.getTime() - fechaInicio.getTime();
      let tiempoTranscurrido = actual.getTime() - fechaInicio.getTime();
      porcentaje = Math.round(tiempoTranscurrido * 100 / tiempoTotal);
    }

    return porcentaje;
  }

  validarFechas(tareas: Tarea[]){
    for(let tarea of tareas){
      tarea.fechaInicio = new Date(tarea.fechaInicio);
      tarea.fechaFin = new Date(tarea.fechaFin);
    }
  }

  cargarPrioridades(){
    for(let tarea of this.tareas){
      if(!this.prioridades.includes(tarea.prioridad)){
        this.prioridades.push(tarea.prioridad);
      }
    }
  }

  ngOnInit(){ 
    this.validarFechas(this.tareas);
  }

  limpiarFiltradas(tareasFiltro: Tarea[]){
    tareasFiltro = [];  
  }

  limpiarAgrupadas(){
    this.tareasAgrupadas = [];
  }

  filtrarTareas(tareasFiltro: Tarea[], tareas: Tarea[]) {
    this.limpiarFiltradas(tareasFiltro);
  
    this.validarFechas(tareas);
    this.validarFechas(tareasFiltro);

    if (!this.estado.pendiente && !this.estado.enCurso && !this.estado.completado) {
      tareasFiltro.splice(0, tareasFiltro.length, ...tareas);
    } else {
      let nuevasTareas: Tarea[] = [];
  
      if (this.estado.pendiente) {
        nuevasTareas = nuevasTareas.concat(tareas.filter((tarea) => this.actual < tarea.fechaInicio && !tarea.completado));
      }
    
      if (this.estado.enCurso) {
        nuevasTareas = nuevasTareas.concat(tareas.filter(tarea => tarea.fechaFin > this.actual && tarea.fechaInicio < this.actual && !tarea.completado));
      }
    
      if (this.estado.completado) {
        nuevasTareas = nuevasTareas.concat(tareas.filter(tarea => tarea.completado || this.actual > tarea.fechaFin));
      }
      
      tareasFiltro.splice(0, tareasFiltro.length, ...nuevasTareas); 
    }

    this.validarFechas(tareasFiltro);
  }

  filtrarAgrupadas(){
    for(let tareas of this.tareasAgrupadas){
      this.filtrarTareas(tareas, tareas);
    }
  }

  agruparTareas(){
<<<<<<< HEAD
    //console.log(this.agrupacion.prioridad);
=======
>>>>>>> 3938b615f7a73f7a2a55ffef730f9474eb3dee6e
    this.limpiarAgrupadas();
    this.cargarPrioridades();
    for(let prioridad of this.prioridades){
      this.tareasAgrupadas.push(this.tareas.filter(tarea => tarea.prioridad == prioridad));
      this.filtrarAgrupadas();
    }
  }

  getColaboradores(tarea: Tarea){
    let colaboradores = '';
    for (let colaborador of tarea.colaboradores) {
        colaboradores += '\n' + colaborador.nombreC;
    }
<<<<<<< HEAD
    //console.log(colaboradores);
=======
>>>>>>> 3938b615f7a73f7a2a55ffef730f9474eb3dee6e
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
