import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Colaborador } from '../../models/colaborador';
import { ProyectosService } from '../../services/proyectos-service.service';

@Component({
  selector: 'app-project-creator',
  standalone: true,
  imports: [ButtonModule, FormsModule, DialogModule, InputText, CommonModule],
  templateUrl: './project-creator.component.html',
  styleUrl: './project-creator.component.css'
})
export class ProjectCreatorComponent {
  nombreProyecto: string = '';
  colaboradores: Colaborador[] = [];
  nombreColaborador: string = '';
  correoColaborador: string = '';
  
  @Input() projectCreatorVisible: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  onCloseDialog() {
    this.projectCreatorVisible = false;
    this.onClose.emit();
  }

  addColaborador() {
    if (this.nombreColaborador.trim() && this.correoColaborador.trim()) {
      this.colaboradores.push(new Colaborador(this.nombreColaborador, this.correoColaborador));
      this.nombreColaborador = '';
      this.correoColaborador = '';
    } else {
      alert('Por favor, complete ambos campos antes de añadir un colaborador.');
    }
  }

  removeColaborador(idC: number) {
    this.colaboradores.splice(idC, 1);
  }

  createProject() {
    if (this.nombreProyecto.trim()) {
      const nuevoProyecto = {
        nombre: this.nombreProyecto,
        colaboradores: this.colaboradores,
      };
      this.resetForm();
      this.projectCreatorVisible = false;
      this.onClose.emit();
    } else {
      alert('El nombre del proyecto es obligatorio.');
    }
  }

  resetForm() {
    this.nombreProyecto = '';
    this.colaboradores = [];
    this.nombreColaborador = '';
    this.correoColaborador = '';
  }
}
