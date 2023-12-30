export class Document {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public file_path: string,
        public folder_id: number,
        public upload_date: string,
    ) {

    }
}