import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import { Proyecto } from '../../models/proyecto';
import { Tarea } from '../../models/tarea';
import { TareasService } from '../../services/tareas-service.service';

@Component({
  selector: 'app-task-creator',
  standalone: true,
  imports: [DialogModule, SelectModule, Button, FormsModule, InputTextModule, CalendarModule],
  templateUrl: './task-creator.component.html',
  styleUrl: './task-creator.component.css'
})
export class TaskCreatorComponent {
  proyectos: Proyecto[] = [new Proyecto(0, "Default Project", [], [])];
  proyectoTarea: Proyecto = this.proyectos[0]; 
  prioridades: string[] = ["Urgente", "Alta", "Media", "Baja"];
  prioridadTarea: string = this.prioridades[this.prioridades.length/2];
  nombreTarea: string = "Tarea";
  fechaActual: Date = new Date();
  rangoFechas: Date[] = [];

  constructor(private tareasService: TareasService){}

  onSubmit(){
    let nuevaTarea: Tarea = new Tarea(this.nombreTarea, this.rangoFechas[0], this.rangoFechas[1], this.prioridadTarea, [], [], false);
    this.tareasService.addTarea(nuevaTarea);
  }
}
