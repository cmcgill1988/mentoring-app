export class DisplayItem {
    constructor(
        public $key: string = '',
        public title: string = '',
        public text: any = '',
        public summary: any = '',
        public imgUrl: string = null,
        public author: string = '',
        public likes: number = 0,
        public comments: number = 0,
        public commentNode: string = '',
        public dateAdded: string = (new Date()).toISOString(),
        public timeStamp: Date = new Date()
    ) { }
}
