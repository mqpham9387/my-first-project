import { Partner } from '../partner/partner';
import { Contact } from '../contact/contact';
import { InquiryType } from './inquiryType.model';
import { Port } from '../port/port';
import { ServiceTerm } from './service-term.model';
import { ServiceInquiryVolumeFCL } from './service-inquiry-volumeFCL.model';

export class Inquiry {
    constructor(
        public _id? : string,
        public inquiryID? : string,
        public creator? : Contact,
        public dateCreate? : string,
        public dateModify? : string,
        public cargoReadyDate? : string,
        public client? : Partner,
        public commodity? : string,
        public commodityDescriptions? : string,
        public hsCode? : string,
        public specialRequirement? : string,
        public targetRateAndCharges? : string,
        public sentTo? : Contact,
        public forwardedTo? : Contact,
        public lastQuotedOn? : string,
        public termofService? : ServiceTerm,
        public customsClearanceAtOrigin? : boolean,
        public customsClearanceAtDestination? : boolean,
        public pickupAt? : string,
        public deliveryTo? : string,
        public portofLoading? : Port,
        public portofDischarge? : Port,
        public volume? : string,
        public volumeUnit? : string,
        public quantity? : string,
        public dimensions? : string,
        public grossWeight? : string,
        public palletQuantity? : string,
        public eachPalletDimension? : string,
        public eachPalletGrossWeight? : string,
        public nonPalletPackageQuantity? : string,
        public truckingMaxLength? : string,
        public truckingMaxWidth? : string,
        public truckingMaxHeight? : string,
        public truckingMaxWeightPerPackage? : string,
        public cargoIsUnstackable? : boolean,
        public packageCanBeTilted? : boolean,
        public isExport? : boolean,
        public clearanceTerminal? : string,
        public purposeOfImEx? : string,
        public notes? : string,
        public inquiryType? : InquiryType,
        public isReceived? : boolean,
        public serviceInquiryVolumeFCL?: ServiceInquiryVolumeFCL[],
        public needExpressService?: boolean,
        public deadlineDelivery?: string,
        public commodityType?: string,
        public doorToDoor?: boolean,
        public doorToPort?: boolean,
        public isFCL?: boolean,
        public isLCL?: boolean,
        public portToDoor?: boolean,
        public portToPort?: boolean,
        public purposeOfExport?: string,
        public purposeOfImport?: string,
        public status?: string,
    ) {
        if(this._id == null) this._id = null;
        if(this.inquiryID == null) this.inquiryID = null;
        if(this.creator == null) this.creator = null;
        if(this.dateCreate == null) this.dateCreate = null;
        if(this.dateModify == null) this.dateModify = null;
        if(this.cargoReadyDate == null) this.cargoReadyDate = null;
        if(this.client == null) this.client = null;
        if(this.commodity == null) this.commodity = null;
        if(this.commodityDescriptions == null) this.commodityDescriptions = null;
        if(this.hsCode == null) this.hsCode = null;
        if(this.specialRequirement == null) this.specialRequirement = null;
        if(this.targetRateAndCharges == null) this.targetRateAndCharges = null;
        if(this.sentTo == null) this.sentTo = null;
        if(this.forwardedTo == null) this.forwardedTo = null;
        if(this.lastQuotedOn == null) this.lastQuotedOn = null;
        if(this.termofService == null) this.termofService = null;
        if(this.customsClearanceAtOrigin == null) this.customsClearanceAtOrigin = false;
        if(this.customsClearanceAtDestination == null) this.customsClearanceAtDestination = false;
        if(this.pickupAt == null) this.pickupAt = null;
        if(this.deliveryTo == null) this.deliveryTo = null;
        if(this.portofLoading == null) this.portofLoading = null;
        if(this.portofDischarge == null) this.portofDischarge = null;
        if(this.volume == null) this.volume = null;
        if(this.volumeUnit == null) this.volumeUnit = null;
        if(this.quantity == null) this.quantity = null;
        if(this.dimensions == null) this.dimensions = null;
        if(this.grossWeight == null) this.grossWeight = null;
        if(this.palletQuantity == null) this.palletQuantity = null;
        if(this.eachPalletDimension == null) this.eachPalletDimension = null;
        if(this.eachPalletGrossWeight == null) this.eachPalletGrossWeight = null;
        if(this.nonPalletPackageQuantity == null) this.nonPalletPackageQuantity = null;
        if(this.truckingMaxLength == null) this.truckingMaxLength = null;
        if(this.truckingMaxWidth == null) this.truckingMaxWidth = null;
        if(this.truckingMaxHeight == null) this.truckingMaxHeight = null;
        if(this.truckingMaxWeightPerPackage == null) this.truckingMaxWeightPerPackage = null;
        if(this.cargoIsUnstackable == null) this.cargoIsUnstackable = false;
        if(this.packageCanBeTilted == null) this.packageCanBeTilted = false;
        if(this.isExport == null) this.isExport = false;
        if(this.clearanceTerminal == null) this.clearanceTerminal = null;
        if(this.purposeOfImEx == null) this.purposeOfImEx = null;
        if(this.notes == null) this.notes = null;
        if(this.inquiryType == null) this.inquiryType = null;
        if(this.isReceived == null) this.isReceived = false;
        if(this.serviceInquiryVolumeFCL == null) this.serviceInquiryVolumeFCL = [];
        if(this.needExpressService == null) this.needExpressService = false;
        if(this.deadlineDelivery == null) this.deadlineDelivery = null;
        if(this.commodityType == null) this.commodityType = null;
        if(this.doorToDoor == null) this.doorToDoor = false;
        if(this.doorToPort == null) this.doorToPort = false;
        if(this.isFCL == null) this.isFCL = false;
        if(this.isLCL == null) this.isLCL = false;
        if(this.portToDoor == null) this.portToDoor = false;
        if(this.portToPort == null) this.portToPort = false;
        if(this.purposeOfExport == null) this.purposeOfExport = '';
        if(this.purposeOfImport == null) this.purposeOfImport = '';
        if(this.status == null) this.status = 'pending';
    }
}
