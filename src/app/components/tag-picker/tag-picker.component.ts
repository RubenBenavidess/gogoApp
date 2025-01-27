import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular//common';
import { PopoverModule } from 'primeng/popover';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { Etiqueta } from '../../models/etiqueta';
import { EtiquetasService } from '../../services/etiquetas-service.service';
@Component({
  selector: 'app-tag-picker',
  standalone: true,
  imports: [PopoverModule, CommonModule, SelectModule, ButtonModule],
  templateUrl: './tag-picker.component.html',
  styleUrl: './tag-picker.component.css'
})
export class TagPickerComponent {
  etiquetas: Etiqueta[] = [];

  @Output() onPick = new EventEmitter<Etiqueta>();

  constructor(
      private etiquetasService: EtiquetasService,
    ) {
      // Suscripción al BehaviorSubject de etiquetas
      this.etiquetasService.etiquetas$.subscribe((etiquetas) => {
        this.etiquetas = etiquetas;
      });
      
    }

    ngOnInit(){
      this.etiquetasService.fetchEtiquetas();
      
    }

    elegirEtiqueta(etiqueta: Etiqueta){
      
      this.onPick.emit(etiqueta);
    }
}
