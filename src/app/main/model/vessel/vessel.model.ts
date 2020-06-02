export class Vessel {
    constructor(
        public _id: string,
        public partnerID: string,
        public creator: string,
        public dateCreate: string,
        public dateModify: string,
        public portofLoading: string,
        public portofDischarge: string,
        public etd: string,
        public eta: string,
        public routeTransit: RouteTransit[],
        public notes: string,
        public active: boolean
    ) { }
}

export class VesselView {
    constructor(
        _id: string, 
        public partnerID: string,
        public creator: string,
        public dateCreate: string,
        public dateModify: string,
        public portofLoading: string,
        public portofDischarge: string,
        public etd: string,
        public eta: string,
        public routeTransit: RouteTransit[],
        public notes: string,
        public active: boolean,
        public action: string
    ) {
        this.partnerID = null;
        this.creator = 'ADMIN';
        this.dateCreate = null;
        this.dateModify = null;
        this.portofLoading = null;
        this.portofDischarge = null;
        this.etd = null;
        this.eta = null;
        this.routeTransit = [];
        this.notes = null;
        this.active = false;
        this.action = 'ADD';
    }
}

export class RouteTransit {

    constructor(
        public index: number,
        public portofTransit: string,
        public portofDischarge: string,
        public etaToTransitPort: string,
        public vessel: string,
        public voyage: string,
    ) { }
}
