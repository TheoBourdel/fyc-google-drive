export class Folder {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public parent_id: number,
        public created_at: string,
        public updated_at: string
    ) {

    }
}