import { Colaborador } from "./colaborador";
import { Etiqueta } from "./etiqueta";

export class Tarea{
    idT: number;
    nombreT: string;
    fechaInicio: string;
    fechaFin: string;
    prioridad: string;
    etiquetas: Etiqueta[];
    colaboradores: Colaborador[];
    completado: boolean;

    constructor(idT: number, nombreT: string, fechaInicio: string, fechaFin: string, prioridad: string, 
        etiquetas: Etiqueta[], colaboradores: Colaborador[], completado: boolean) 
    {
        this.idT = idT;
        this.nombreT = nombreT;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.prioridad = prioridad;
        this.etiquetas = etiquetas;
        this.colaboradores = colaboradores;
        this.completado = completado;
    }

}