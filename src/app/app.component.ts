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

  showTaskCreator(): void{
    this.taskCreatorVisible = true;
  }
}
