export class Dobavljaci{
    id: number
    nazivFirme: string
    lokacija: string
    telefon: string
    ocjena: number
    pocetakUgovora: string
    krajUgovora: string

    constructor(id:number,nazivFirme:string,lokacija:string,telefon:string,pocetakUgovora:string,krajUgovora:string,ocjena:number){
        this.id=id
        this.nazivFirme=nazivFirme
        this.lokacija=lokacija
        this.telefon=telefon
        this.pocetakUgovora=pocetakUgovora
        this.krajUgovora=krajUgovora,
        this.ocjena= ocjena
    }

}