import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { Proyecto } from '../../models/proyecto';
import { Tarea } from '../../models/tarea';
import { TareasService } from '../../services/tareas-service.service';
import { ProyectosService } from '../../services/proyectos-service.service'; // Importa el servicio de proyectos
import { ProjectCreatorComponent } from "../project-creator/project-creator.component";

@Component({
  selector: 'app-task-creator',
  standalone: true,
  imports: [DialogModule, SelectModule, Button, FormsModule, InputTextModule, CalendarModule, ProjectCreatorComponent],
  templateUrl: './task-creator.component.html',
  styleUrl: './task-creator.component.css'
})
export class TaskCreatorComponent {
  @Input() taskCreatorVisible: boolean = false;
  @Output() onClose = new EventEmitter<boolean>();
  projectCreatorVisible: boolean = false;

  proyectos: Proyecto[] = [];
  proyectoTarea: Proyecto | null = null; // El proyecto seleccionado
  prioridades: string[] = ["Urgente", "Alta", "Media", "Baja"];
  prioridadTarea: string = this.prioridades[2]; // Prioridad inicial
  nombreTarea: string = "Tarea";
  fechaActual: Date = new Date();
  rangoFechas: Date[] = [];

  constructor(
    private tareasService: TareasService,
    private proyectosService: ProyectosService // Inyección del servicio
  ) {
    // Suscripción al BehaviorSubject de proyectos
    this.proyectosService.proyectos$.subscribe((proyectos) => {
      this.proyectos = proyectos;
      if (this.proyectos.length > 0) {
        this.proyectoTarea = this.proyectos[0]; // Selecciona el primer proyecto por defecto
      }
    });
  }

  ngOnInit() {
    // Obtén la lista inicial de proyectos
    this.proyectosService.fetchProyectos();
  }

  showProjectCreator() {
    if (this.taskCreatorVisible) {
      this.taskCreatorVisible = false;
    }
    this.projectCreatorVisible = true;
  }

  onSubmit() {
    if (this.proyectoTarea) {
      let nuevaTarea: Tarea = new Tarea(
        this.nombreTarea,
        this.rangoFechas[0],
        this.rangoFechas[1],
        this.prioridadTarea,
        [],
        [],
        false    
      );

      nuevaTarea.idT = this.proyectoTarea.tareas.length;
      console.log(nuevaTarea);
      this.tareasService.addTarea(this.proyectoTarea.idP, nuevaTarea);
      this.taskCreatorVisible = false;
      this.onClose.emit(true);
    } else {
      console.error('No se ha seleccionado un proyecto válido.');
    }
  }

  onCloseDialog() {
    this.taskCreatorVisible = false;
    if (!this.projectCreatorVisible) {
      this.onClose.emit(true);
    }
  }

  handleProjectCreatorClose() {
    this.projectCreatorVisible = false;
    this.taskCreatorVisible = true;
    console.log('reabrir');
    this.onClose.emit(false);
  }
}
