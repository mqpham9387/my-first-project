export class Report {
    constructor(
        public _id?: string,
        public devFullName?: string,
        public position?: string,
        public content?: string,
        public progress?: string,
        public dateCreate?: string,
        public dateModify?: string
    ) {
        if (this._id == null) {this._id = null;}
        if (this.devFullName == null) { this.devFullName = null; }
        if (this.position == null) { this.position = null; }
        if (this.content == null) { this.content = null; }
        if (this.progress == null) { this.progress = null; }
        if (this.dateCreate == null) { this.dateCreate = null; }
        if (this.dateModify == null) { this.dateModify = null; }
    }
}
