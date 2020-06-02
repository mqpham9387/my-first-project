export class ServiceTerm {
    constructor(
        public _id? : string,
        public termID? : string,
        public termName? : string
    ) {
        if(this._id == null) this._id = null;
        if(this.termID == null) this.termID = null;
        if(this.termName == null) this.termName = null;
    }
}