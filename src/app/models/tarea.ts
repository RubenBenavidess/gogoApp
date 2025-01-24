import { Colaborador } from "./colaborador";
import { Etiqueta } from "./etiqueta";

export class Tarea {
    idT: number;
    nombreT: string;
    fechaInicio: Date;
    fechaFin: Date;
    prioridad: string;
    etiquetas: Etiqueta[];
    colaboradores: Colaborador[];
    completado: boolean;

    constructor(
        nombreT: string,
        fechaInicio: Date,
        fechaFin: Date,
        prioridad: string,
        etiquetas: Etiqueta[],
        colaboradores: Colaborador[],
        completado: boolean,
        idT?: number
    ) {
        if (idT) this.idT = idT;
        else this.idT = -1;

        this.nombreT = nombreT;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.prioridad = prioridad;
        this.etiquetas = etiquetas;
        this.colaboradores = colaboradores;
        this.completado = completado;
    }

}
