import { Colaborador } from "./colaborador";
import { Tarea } from "./tarea";

export class Proyecto{
    idP: number;
    nombreP: string;
    tareas: Tarea[];
    colaboradores: Colaborador[];

    constructor(nombreP: string, tareas: Tarea[], colaboradores: Colaborador[], idP?: number,) {
        if(idP)
            this.idP = idP;
        else
            this.idP = -1;
        this.nombreP = nombreP;
        this.tareas = tareas;
        this.colaboradores = colaboradores;
    }

}