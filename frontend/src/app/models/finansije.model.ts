export class Finansije{
    id: number
    prihod: string
    trosak: string
    rezije: string
    plate: string
    oprema: string
    ostaliTr: string

    constructor(id:number,prihod:string,trosak:string,rezije:string,plate:string,oprema:string,ostaliTr:string){
        this.id=id
        this.prihod=prihod
        this.trosak=trosak
        this.rezije=rezije
        this.plate=plate
        this.oprema=oprema
        this.ostaliTr=ostaliTr
    }

}