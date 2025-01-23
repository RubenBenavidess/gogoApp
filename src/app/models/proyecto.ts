import { Colaborador } from "./colaborador";
import { Tarea } from "./tarea";

export class Proyecto{
    idP: number;
    nombreP: string;
    tareas: Tarea[];
    colaboradores: Colaborador[];

    constructor(idP: number, nombreP: string, tareas: Tarea[], colaboradores: Colaborador[]) {
        this.idP = idP;
        this.nombreP = nombreP;
        this.tareas = tareas;
        this.colaboradores = colaboradores;
    }

}