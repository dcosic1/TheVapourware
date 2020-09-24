export class Konsultanti{
    id: number;
    ime: string;
    prezime: string;
    telefon: string;
    email: string;
    ekspertiza: string;
    estimate: number;
    projekat: string;


    constructor(id:number,ime:string,prezime:string,telefon:string,email:string,ekspertiza:string, projekat:string){
        this.id=id
        this.ime=ime
        this.prezime=prezime
        this.telefon=telefon
        this.email=email
        this.ekspertiza=ekspertiza
        this.projekat=projekat
        this.ekspertiza=ekspertiza
    }

}