export class GlobalService{
    public username: string;
    constructor() {

        
    }

    setUserName(user: string){
        this.username = user;
        console.log('lala uuu', this.username)
    }
}