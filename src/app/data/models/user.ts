export class User {
    constructor(
        public $key: string = '',
        public displayName: string = '',
        public photoURL: string = null,
        public uid: string = '',
        public isAdmin: boolean = false
    ) { }
}
