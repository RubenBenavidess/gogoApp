import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TaskCreatorComponent } from "./components/task-creator/task-creator.component";
import { ProjectListComponent } from "./components/project-list/project-list.component";
import { TagPickerComponent } from "./components/tag-picker/tag-picker.component";

@Component({
  selector: 'app-root',
  imports: [DialogModule, TaskCreatorComponent, ButtonModule, ProjectListComponent, TagPickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gogoApp';
  taskCreatorVisible: boolean = false;

  showTaskCreator(): void{
    this.taskCreatorVisible = true;
  }

  handleTaskCreatorClose(isClosed: boolean): void{
    this.taskCreatorVisible = !isClosed;
  }
}
