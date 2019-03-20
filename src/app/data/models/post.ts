export class Post {
    constructor(
        public $key: string = '',
        public title: string = '',
        public content: string = '',
        public summary: string = '',
        public imgUrl: string = null,
        public author: string = '',
        public likes: number = 0,
        public comments: number = 0,
        public dateAdded: string = (new Date()).toISOString(),
        public timeStamp: any = new Date()
    ) { }
}
