import { Component } from '@angular/core';
import { ProyectosService } from '../../services/proyectos-service.service';
import { AccordionModule } from 'primeng/accordion';
import { Proyecto } from '../../models/proyecto';
import { TaskListComponent } from '../task-list/task-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-list',
  imports: [AccordionModule, TaskListComponent, CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {

  proyectos: Proyecto[] = [];

  constructor(private proyectosService: ProyectosService) {
    this.proyectosService.proyectos$.subscribe((proyectos) => {
      this.proyectos = proyectos;
    });
  }

  ngOnInit(){
    this.proyectosService.fetchProyectos();
    for(let proyecto of this.proyectos){
      for(let tarea of proyecto.tareas){
        tarea.fechaInicio = new Date(tarea.fechaInicio);
        tarea.fechaFin = new Date(tarea.fechaFin);
      }
    }
  }
}
