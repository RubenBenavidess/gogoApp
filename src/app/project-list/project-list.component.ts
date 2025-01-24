import { Component } from '@angular/core';
import { ProyectosService } from '../services/proyectos-service.service';
import { AccordionModule } from 'primeng/accordion';
import { Proyecto } from '../models/proyecto';
import { TaskListComponent } from '../components/task-list/task-list.component';

@Component({
  selector: 'app-project-list',
  imports: [AccordionModule, TaskListComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {

  proyectos: Proyecto[] = [];

  constructor(private proyectosService: ProyectosService) { }

  cargarTareas(){
    this.proyectos = this.proyectosService.getProyectos();
  }
  
}
