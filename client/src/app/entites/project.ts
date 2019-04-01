export class Project {
    constructor(    
        public name : string,
        public description : string,
        public managerEmail : string,
        public donators : string[],
        public target : number,
        public sum : number,
        public dateOfTarget : Date,
        public video : string
    ){}
}