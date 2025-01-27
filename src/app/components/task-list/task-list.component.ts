import { Component, Input } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { FormsModule } from '@angular/forms';
import { TagPickerComponent } from '../tag-picker/tag-picker.component';
import { ColaboradorPickerComponent } from '../colaborador-picker/colaborador-picker.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { TareasService } from '../../services/tareas-service.service';
import { Etiqueta } from '../../models/etiqueta';
import { Colaborador } from '../../models/colaborador';
import { CheckboxModule } from 'primeng/checkbox';
import { Chip, ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, ProgressBarModule, TagPickerComponent, CheckboxModule, ChipModule, ColaboradorPickerComponent],
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
    completado: false,
    atrasado: false
  };
  agrupacion = {
    prioridad: false
  };
  filtrado: boolean = false;
  agrupado: boolean = false;
  etiquetado: boolean = false;
  actual = new Date();
  prioridades: string[] = [];

  constructor(private tareasService: TareasService) {
  }

  anadirEtiqueta(tarea: Tarea, etiqueta: Etiqueta){
    tarea.etiquetas.push(etiqueta);
    this.tareasService.updateTarea(this.idP, tarea.idT, tarea);
  }

  eliminarEtiqueta(tarea: Tarea, idE: number){
    for(let i = 0; i < tarea.etiquetas.length; i++){
      if(tarea.etiquetas[i].idE == idE){
        tarea.etiquetas.splice(i, 1);
        this.tareasService.updateTarea(this.idP, tarea.idT, tarea);
        break;
      }
    }
  }

  anadirColaborador(tarea: Tarea, colaborador: Colaborador){
    tarea.colaboradores.push(colaborador);
    this.tareasService.updateTarea(this.idP, tarea.idT, tarea);
  }

  eliminarColaborador(tarea: Tarea, idC: number){
    let updated = false;
    for(let i = 0; i < tarea.colaboradores.length; i++){
      if(tarea.colaboradores[i].idC == idC){
        tarea.colaboradores.splice(i, 1);
        updated = true;
        break;
      }
    }
    if(updated)
      this.tareasService.updateTarea(this.idP, tarea.idT, tarea);
  }

  actualizarCompletado(tarea: Tarea){
    this.tareasService.updateTarea(this.idP, tarea.idT, tarea);
  }

  calcularProgreso(tarea: Tarea){
    let fechaInicio = new Date(tarea.fechaInicio);
    let fechaFin = new Date(tarea.fechaFin);
    let actual = new Date();
    let porcentaje = 0;

    if(tarea.completado || actual > fechaFin && tarea.completado){
      porcentaje = 100;
    } else if(actual < fechaInicio && !tarea.completado){
      porcentaje = 0;
    } else if(actual > fechaFin && actual > fechaInicio && !tarea.completado){
      porcentaje = 0;

    }else {
      let tiempoTotal = fechaFin.getTime() - fechaInicio.getTime();
      let tiempoTranscurrido = actual.getTime() - fechaInicio.getTime();
      porcentaje = Math.round(tiempoTranscurrido * 100 / tiempoTotal);
    }

    return porcentaje;
  }

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

    if (!this.estado.pendiente && !this.estado.enCurso && !this.estado.completado && !this.estado.atrasado) {
      tareasFiltro.splice(0, tareasFiltro.length, ...tareas);
    } else {
      let nuevasTareas: Tarea[] = [];
  
      if (this.estado.pendiente) {
        nuevasTareas = nuevasTareas.concat(tareas.filter((tarea) => this.actual < new Date(tarea.fechaInicio) && !tarea.completado));
      }
    
      if (this.estado.enCurso) {
        nuevasTareas = nuevasTareas.concat(tareas.filter(tarea => new Date(tarea.fechaFin) > this.actual && new Date(tarea.fechaInicio) < this.actual && !tarea.completado));
      }
    
      if (this.estado.completado) {
        nuevasTareas = nuevasTareas.concat(tareas.filter(tarea => tarea.completado || (this.actual > new Date(tarea.fechaFin))));
      } 

      if(this.estado.atrasado){
        nuevasTareas = nuevasTareas.concat(tareas.filter(tarea => this.actual > new Date(tarea.fechaFin) && this.actual > new Date(tarea.fechaInicio) && !tarea.completado));
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
        colaboradores += '<br>' + colaborador.nombreC;
    }
    return colaboradores;
  }

  getEtiquetas(tarea: Tarea){
    let etiquetas = '';
    for (let etiqueta of tarea.etiquetas) {
        etiquetas += '<br>' + etiqueta.nombreE;
    }
    return etiquetas;
  }

  calcularEstado(fechaInicio: Date, fechaFin: Date, completado: boolean): string {
    const dInicio = new Date(fechaInicio);
    const dFin = new Date(fechaFin);
    if(completado){
      return "Completado";
    }
    else if(this.actual < dInicio && !completado) {
      return "Pendiente";
    }
    else if (dFin > this.actual && dInicio < this.actual && !completado) {
      return "En Curso";
    }
    else if(completado && this.actual > dFin) {
      return "Completado";
    }
    else if(dFin < this.actual && dInicio < this.actual && !completado){
      return "Atrasado";
    }
    return 'Sin estado';
  }

  formatDate(fecha: Date): string {
    const d = new Date(fecha);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  }
}
