export class Colaborador{
    idC: number;
    nombreC: string;
    correo: string;

    constructor(nombreC: string, correo: string, idC?: number) {
        if(idC)
            this.idC = idC
        else
            this.idC = -1;
        
        this.nombreC = nombreC;
        this.correo = correo;
    }
}