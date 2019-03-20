export class Comment {
    constructor(
        public $key: string = '',
        public parentPost: string = '',
        public author: string = '',
        public content: string = '',
        public likes: number = 0,
        public replies: number = 0,
        public commentNode: string = '',
        public dateAdded: string = (new Date()).toISOString(),
        public timeStamp: Date = new Date()
    ) { }
}
