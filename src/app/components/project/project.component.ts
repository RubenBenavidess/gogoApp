import { Component } from '@angular/core';
import { Proyecto } from '../../models/proyecto';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

  proyecto: Proyecto;

  constructor() {
    this.proyecto = new Proyecto(1, 'Proyecto 1');
  }



}
