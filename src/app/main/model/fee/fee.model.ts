
export class Fee {
    constructor(
        public _id?: string,
        public feeID?: string,
        public feeCode?: string,
        public feeNameEnglish?: string,
        public feeNameLocal?: string,
        public groupName?: string,
        public kbck?: boolean,
        public departmentID?: string,
        public userInput?: string,
        public dateModify?: string,
        public defaultUnit?: string,
        public defaultQuantity?: string
    ) {
        if (this._id == null) { this._id = null; }
        if (this.feeID == null) { this.feeID = null; }
        if (this.feeCode == null) { this.feeCode = null; }
        if (this.feeNameEnglish == null) { this.feeNameEnglish = null; }
        if (this.feeNameLocal == null) { this.feeNameLocal = null; }
        if (this.groupName == null) { this.groupName = null; }
        if (this.kbck == null) { this.kbck = null; }
        if (this.departmentID == null) { this.departmentID = null; }
        if (this.userInput == null) { this.userInput = null; }
        if (this.dateModify == null) { this.dateModify = null; }
        if (this.defaultUnit == null) { this.defaultUnit = null; }
        if (this.defaultQuantity == null) { this.defaultQuantity = null; }
    }
}