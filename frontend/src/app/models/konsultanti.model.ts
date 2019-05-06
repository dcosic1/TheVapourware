export class Konsultanti{
    id: number
    ime: string
    prezime: string
    telefon: string
    email: string
    ekspertiza: string

    constructor(id:number,ime:string,prezime:string,telefon:string,email:string,ekspertiza:string){
        this.id=id
        this.ime=ime
        this.prezime=prezime
        this.telefon=telefon
        this.email=email
        this.ekspertiza=ekspertiza
    }

}