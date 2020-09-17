export class Note {
    noteId: number;
    title: string;
    description: string;


    constructor(id:number,title:string,description:string ){
        this.noteId=id
        this.title=title
        this.description=description
    }
}