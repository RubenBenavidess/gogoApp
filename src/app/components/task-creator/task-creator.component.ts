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

  proyectos: Proyecto[] = [new Proyecto(0, "Default Project", [], [])];
  proyectoTarea: Proyecto = this.proyectos[0]; 
  prioridades: string[] = ["Urgente", "Alta", "Media", "Baja"];
  prioridadTarea: string = this.prioridades[this.prioridades.length/2];
  nombreTarea: string = "Tarea";
  fechaActual: Date = new Date();
  rangoFechas: Date[] = [];
  

  constructor(private tareasService: TareasService){}

  showProjectCreator(){
    if(this.taskCreatorVisible){
      this.taskCreatorVisible = false
    }
    this.projectCreatorVisible = true;
  }

  onSubmit(){
    let nuevaTarea: Tarea = new Tarea(this.nombreTarea, this.rangoFechas[0], this.rangoFechas[1], this.prioridadTarea, [], [], false);
    this.tareasService.addTarea(nuevaTarea);
    
    this.taskCreatorVisible = false;
    this.onClose.emit(true); 
  }

  onCloseDialog() {
    this.taskCreatorVisible = false;
    if(!this.projectCreatorVisible){
      this.onClose.emit(true);
    }
  }

  handleProjectCreatorClose(){
    this.projectCreatorVisible = false;
    this.taskCreatorVisible = true;
    console.log('reabrir');
    this.onClose.emit(false);
  }
}
