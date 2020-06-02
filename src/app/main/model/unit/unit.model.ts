export class Unit {
    constructor(
        public _id?: string,
        public unitID?: string,
        public description?: string,
        public originCountry?: string,
        public kgs?: string,
        public length?: number,
        public height?: number,
        public width?: number,
        public localUnit?: string,
        public isoCode?: string,
        public group?: string,
        public notes?: string,
    ) {
        if (this._id == null) { this._id = null; }
        if (this.unitID == null) { this.unitID = null; }
        if (this.description == null) { this.description = null; }
        if (this.originCountry == null) { this.originCountry = null; }
        if (this.kgs == null) { this.kgs = null; }
        if (this.length == null) { this.length = null; }
        if (this.height == null) { this.height = null; }
        if (this.width == null) { this.width = null; }
        if (this.localUnit == null) { this.localUnit = null; }
        if (this.isoCode == null) { this.isoCode = null; }
        if (this.group == null) { this.group = null; }
        if (this.notes == null) { this.notes = null; }
    }
}