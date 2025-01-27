import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular//common';
import { PopoverModule } from 'primeng/popover';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { Colaborador } from '../../models/colaborador';
import { ProyectosService } from '../../services/proyectos-service.service';

@Component({
  selector: 'app-colaborador-picker',
  standalone: true,
  imports: [ButtonModule, PopoverModule, CommonModule],
  templateUrl: './colaborador-picker.component.html',
  styleUrl: './colaborador-picker.component.css'
})
export class ColaboradorPickerComponent {
  @Input() idP: number = 0  ;
  colaboradoresDisponibles: Colaborador[] = [];

  constructor(private proyectosService: ProyectosService) {
    this.proyectosService.proyectos$.subscribe((proyectos) => {
      this.colaboradoresDisponibles = proyectos.find((proyecto) => proyecto.idP == this.idP)?.colaboradores ?? [];
    });
  }

  @Output() onPick = new EventEmitter<Colaborador>();

  elegirColaborador(colaborador: Colaborador){
    this.onPick.emit(colaborador);
  }
}
