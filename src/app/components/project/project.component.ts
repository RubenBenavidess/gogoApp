import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/proyecto';
import { AccordionContent, AccordionHeader, AccordionModule, AccordionPanel } from 'primeng/accordion';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskCreatorComponent } from "../task-creator/task-creator.component";

@Component({
  selector: 'app-project',
  imports: [AccordionModule, AccordionPanel, AccordionHeader, AccordionContent, TaskListComponent, TaskCreatorComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

  proyecto: Proyecto;

  constructor() {
    this.proyecto = new Proyecto(1, 'Proyecto 1');
  }

  ngOnInit(): void {
  }

}
