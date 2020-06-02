export class Area {
    constructor(
        public _id?: string,
        public areaID?: string,
        public areaName?: string,
        public notes?: string
    ) {
        if (this._id == null) { this._id = null; }
        if (this.areaID == null) { this.areaID = null; }
        if (this.areaName == null) { this.areaName = null; }
        if (this.notes == null) { this.notes = null; }
    }
}