import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TaskCreatorComponent } from "./components/task-creator/task-creator.component";
import { TaskListComponent } from './components/task-list/task-list.component';
import { Tarea } from './models/tarea';
import { Etiqueta } from './models/etiqueta';
import { Colaborador } from './models/colaborador';

@Component({
  selector: 'app-root',
  imports: [DialogModule, TaskCreatorComponent, ButtonModule, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gogoApp';
  taskCreatorVisible: boolean = false;

  tareas = [{
    idT: 1,
    nombreT: 'Desarrollar API Backend',
    fechaInicio: new Date('2025-01-01'),
    fechaFin: new Date('2025-01-10'),
    prioridad: 'Alta',
    etiquetas: [
      new Etiqueta(1, 'Backend'),
      new Etiqueta(2, 'Desarrollo'),
    ],
    colaboradores: [
      new Colaborador('Juan Pérez', 'juan.perez@example.com', 1),
      new Colaborador('Ana Gómez', 'ana.gomez@example.com', 2),
    ],
    completado: false,
  },
  {
    idT: 2,
    nombreT: 'Diseñar interfaz de usuario',
    fechaInicio: new Date('2025-01-05'),
    fechaFin: new Date('2025-01-15'),
    prioridad: 'Media',
    etiquetas: [
      new Etiqueta(3, 'UI/UX'),
      new Etiqueta(4, 'Diseño'),
    ],
    colaboradores: [
      new Colaborador('Carlos Martínez', 'carlos.martinez@example.com', 3),
    ],
    completado: true,
  },
  {
    idT: 3,
    nombreT: 'Pruebas de integración',
    fechaInicio: new Date('2025-01-10'),
    fechaFin: new Date('2025-01-20'),
    prioridad: 'Alta',
    etiquetas: [
      new Etiqueta(5, 'Pruebas'),
      new Etiqueta(6, 'QA'),
    ],
    colaboradores: [
      new Colaborador('Ana Gómez', 'ana.gomez@example.com', 2),
      new Colaborador('Pedro López', 'pedro.lopez@example.com', 4),
    ],
    completado: false,
  }];

  showTaskCreator(): void{
    this.taskCreatorVisible = true;
  }

  handleTaskCreatorClose(isClosed: boolean): void{
    this.taskCreatorVisible = !isClosed;
  }
}
