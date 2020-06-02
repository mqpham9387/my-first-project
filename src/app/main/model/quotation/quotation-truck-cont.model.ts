import { Port } from '../port/port';
import { Currency } from '../currency/currency';

export class QuotationTruckCont {
    constructor(
        public _id?: string,
        public quotationNo?: string,
        public pickup?: Port,
        public delivery?: Port,
        public container20DC?: string,
        public container40DC?: string,
        public containerHQDC?: string,
        public container45DC?: string,
        public container20RF?: string,
        public container40RF?: string,
        public container20OT?: string,
        public container40OT?: string,
        public container20FR?: string,
        public container40FR?: string,
        public container20ISOFoodGrade?: string,
        public container20ISOChemicals?: string,
        public isOriginCharges?: string,
        public currency?: Currency,
        public notes?: string,
        public linkOtherQuotation?: string
    ) {
        if (this._id === null) { this._id = null; }
        if (this.quotationNo === null) { this.quotationNo = null; }
        if (this.pickup === null) { this.pickup = null; }
        if (this.delivery === null) { this.delivery = null; }
        if (this.container20DC === null) { this.container20DC = null; }
        if (this.container40DC === null) { this.container40DC = null; }
        if (this.containerHQDC === null) { this.containerHQDC = null; }
        if (this.container45DC === null) { this.container45DC = null; }
        if (this.container20RF === null) { this.container20RF = null; }
        if (this.container40RF === null) { this.container40RF = null; }
        if (this.container20OT === null) { this.container20OT = null; }
        if (this.container40OT === null) { this.container40OT = null; }
        if (this.container20FR === null) { this.container20FR = null; }
        if (this.container40FR === null) { this.container40FR = null; }
        if (this.container20ISOFoodGrade === null) { this.container20ISOFoodGrade = null; }
        if (this.container20ISOChemicals === null) { this.container20ISOChemicals = null; }
        if (this.isOriginCharges === null) { this.isOriginCharges = null; }
        if (this.currency === null) { this.currency = null; }
        if (this.notes === null) { this.notes = null; }
        if (this.linkOtherQuotation === null) { this.linkOtherQuotation = null; }
    }
}

export const QUOTATION_CONTAINER_COLUMNS = [
    { headerName: 'Pick up', field: 'pickup', width: 200, sortable: false, filter: false },
    { headerName: 'Delivery', field: 'delivery', width: 200, sortable: false, filter: false },
    {
        headerName: "20'", field: 'container20DC', width: 100, sortable: false, filter: false,
        cellEditor: 'numericCellEditor',
    },
    { headerName: "40'", field: 'container40DC', width: 100, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: 'HQDC', field: 'containerHQDC', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '45 DC', field: 'container45DC', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '20 RF', field: 'container20RF', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '40 RF', field: 'container40RF', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '20 OT', field: 'container20OT', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '40 OT', field: 'container40OT', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '20 FR', field: 'container20FR', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '40 FR', field: 'container40FR', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '20 ISO Food Grade', field: 'container20ISOFoodGrade', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '20 ISO Chemicals', field: 'container20ISOChemicals', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: 'Origin Charges', field: 'isOriginCharges', width: 150, sortable: false, filter: false },
    { headerName: 'Currency', field: 'currency', width: 150, sortable: false, filter: false },
    { headerName: 'Notes', field: 'notes', width: 150, sortable: false, filter: false },
    { headerName: 'Link Other Quotation', field: 'linkOtherQuotation', width: 150, sortable: false, filter: false }
];


export const QUOTATION_NON_CONTAINER_COLUMNS = [
    { headerName: 'Pick up', field: 'pickup', width: 200, sortable: false, filter: false },
    { headerName: 'Delivery', field: 'delivery', width: 200, sortable: false, filter: false },
    {
        headerName: "20' truck", field: 'truck20', width: 100, sortable: false, filter: false,
        cellEditor: 'numericCellEditor',
    },
    { headerName: "40' truck", field: 'truck40', width: 100, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '500kgs Truck', field: 'truck500kgs', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '1-ton truck', field: 'truckTonLevel1', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '1.5-ton truck', field: 'truckTonLevel2', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '2-ton truck', field: 'truckTonLevel3', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '2.5-ton truck', field: 'truckTonLevel4', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '3.5-ton truck', field: 'truckTonLevel5', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '5-ton truck', field: 'truckTonLevel6', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '6.5-ton truck', field: 'truckTonLevel7', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '8-ton truck', field: 'truckTonLevel8', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '9.5-ton truck', field: 'truckTonLevel9', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '11-ton truck', field: 'truckTonLevel10', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '13-ton truck', field: 'truckTonLevel11', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '15-ton truck', field: 'truckTonLevel12', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '16.5-ton truck', field: 'truckTonLevel13', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '18-ton truck', field: 'truckTonLevel14', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '20-ton truck', field: 'truckTonLevel15', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' },
    { headerName: '22-ton truck', field: 'truckTonLevel16', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor' }
];