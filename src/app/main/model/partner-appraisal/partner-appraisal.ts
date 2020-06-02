export class PartnerAppraisal {
    _id: string;
    partnerID: string;
    partner_IDKey: string;
    serviceID: string;
    service_IDKey: string;
    serviceName: string;
    priority: string;
    creator: string;
    dateCreate: string;
    updateBy: string;
    dateUpdate: string;
    export: boolean;
    group: string;
    add: boolean;
    edit: boolean;

    constructor() {
        this.partnerID = null;
        this.partner_IDKey = null;
        this.serviceID = null;
        this.service_IDKey = null;
        this.serviceName = null;
        this.priority = '0';
        this.creator = null;
        this.dateCreate = null;
        this.updateBy = null;
        this.dateUpdate = null;
        this.export = false;
        this.group = null;
        this.add = false;
        this.edit = false;
    }
}