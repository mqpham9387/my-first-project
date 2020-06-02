import { Partner } from '../partner/partner';
import { Contact } from '../contact/contact';
import { Commodity } from '../commodity/commodity';
import { QuotationType } from './quotation-type.model';
import { Port } from '../port/port';

export class Quotation {
  constructor(
    public _id?: string,
    public quotationNo?: string,
    public client?: Partner, // "sale/lead/agent" Client -> Partner
    public creator?: Contact,
    public dateCreate?: string,
    public dateModify?: string,
    public quotationDate?: string,
    public termofService?: string,
    public commodity?: Commodity, // Commodities - commodityName
    public hsCode?: string,
    public sentTo?: Contact,
    public pickupAt?: Port,
    public deliveryTo?: Port,
    public deadlineDelivery?: string,
    public volume?: string,
    public volumeUnit?: string,
    public quantity?: string,
    public dimensions?: string,
    public grossWeight?: string,
    public palletizedPackage?: PalletizedPackage[],
    public nonPalletPackageQuantity?: string,
    public truckingVolumeGrossWeight?: TruckingVolumeGrossWeight[],
    public isExport?: string,
    public clearanceTerminal?: string,
    public specialRequirements?: string,
    public targetedRateAndCharges?: string,
    public telexRelease?: string,
    public currency?: string,
    public customsClearanceAtOrigin?: string,
    public customsClearanceAtDestination?: string,
    public cargoIsUnstackable?: string,
    public packageCanBeTilted?: string,
    public needExpressService?: string,
    public remarks?: string,
    public quotationType?: QuotationType,
    public saveDraft?: string,
    public logInfo?: string,
    public cargoReadyDateTo?: string,
    public cargoReadyDateFrom?: string,
    public purposeOfImport?: string,
    public purposeOfExport?: string,
    public doorToDoor?: string,
    public doorToPort?: string,
    public portToDoor?: string,
    public portToPort?: string,
    public forwardedTo?: string,
    public signature?: string,
    public termsAndConditions?: string,
    public grossWeightUnit?: string,
    public commodityType?: string,
    public notes?: string
  ) {
    if (this._id == null) {
      this._id = null;
    }
    if (this.quotationNo == null) {
      this.quotationNo = null;
    }
    if (this.client == null) {
      this.client = null;
    }
    if (this.creator == null) {
      this.creator = null;
    }
    if (this.dateCreate == null) {
      this.dateCreate = null;
    }
    if (this.dateModify == null) {
      this.dateModify = null;
    }
    if (this.quotationDate == null) {
      this.quotationDate = null;
    }
    if (this.termofService == null) {
      this.termofService = null;
    }
    if (this.commodity == null) {
      this.commodity = null;
    }
    if (this.hsCode == null) {
      this.hsCode = null;
    }
    if (this.sentTo == null) {
      this.sentTo = null;
    }
    if (this.pickupAt == null) {
      this.pickupAt = null;
    }
    if (this.deliveryTo == null) {
      this.deliveryTo = null;
    }
    if (this.deadlineDelivery == null) {
      this.deadlineDelivery = null;
    }
    if (this.volume == null) {
      this.volume = null;
    }
    if (this.volumeUnit == null) {
      this.volumeUnit = null;
    }
    if (this.quantity == null) {
      this.quantity = null;
    }
    if (this.dimensions == null) {
      this.dimensions = null;
    }
    if (this.grossWeight == null) {
      this.grossWeight = null;
    }
    if (this.palletizedPackage == null) {
      this.palletizedPackage = null;
    }
    if (this.nonPalletPackageQuantity == null) {
      this.nonPalletPackageQuantity = null;
    }
    if (this.truckingVolumeGrossWeight == null) {
      this.truckingVolumeGrossWeight = null;
    }
    if (this.isExport == null) {
      this.isExport = null;
    }
    if (this.clearanceTerminal == null) {
      this.clearanceTerminal = null;
    }
    if (this.specialRequirements == null) {
      this.specialRequirements = null;
    }
    if (this.targetedRateAndCharges == null) {
      this.targetedRateAndCharges = null;
    }
    if (this.telexRelease == null) {
      this.telexRelease = null;
    }
    if (this.currency == null) {
      this.currency = null;
    }
    if (this.customsClearanceAtOrigin == null) {
      this.customsClearanceAtOrigin = null;
    }
    if (this.customsClearanceAtDestination == null) {
      this.customsClearanceAtDestination = null;
    }
    if (this.cargoIsUnstackable == null) {
      this.cargoIsUnstackable = null;
    }
    if (this.packageCanBeTilted == null) {
      this.packageCanBeTilted = null;
    }
    if (this.needExpressService == null) {
      this.needExpressService = null;
    }
    if (this.remarks == null) {
      this.remarks = null;
    }
    if (this.quotationType == null) {
      this.quotationType = null;
    }
    if (this.saveDraft == null) {
      this.saveDraft = null;
    }
    if (this.logInfo == null) {
      this.logInfo = null;
    }
    if (this.cargoReadyDateTo == null) {
      this.cargoReadyDateTo = null;
    }
    if (this.cargoReadyDateFrom == null) {
      this.cargoReadyDateFrom = null;
    }
    if (this.purposeOfImport == null) {
      this.purposeOfImport = null;
    }
    if (this.purposeOfExport == null) {
      this.purposeOfExport = null;
    }
    if (this.doorToDoor == null) {
      this.doorToDoor = null;
    }
    if (this.doorToPort == null) {
      this.doorToPort = null;
    }
    if (this.portToDoor == null) {
      this.portToDoor = null;
    }
    if (this.portToPort == null) {
      this.portToPort = null;
    }
    if (this.forwardedTo == null) {
      this.forwardedTo = null;
    }
    if (this.signature == null) {
      this.signature = null;
    }
    if (this.termsAndConditions == null) {
      this.termsAndConditions = null;
    }
    if (this.grossWeightUnit == null) {
      this.grossWeightUnit = null;
    }
    if (this.commodityType == null) {
      this.commodityType = null;
    }
    if (this.notes == null) {
      this.notes = null;
    }
  }
}

export class PalletizedPackage {
  constructor(
    public index?: string,
    public quantity?: string,
    public dimension?: string,
    public grossWeight?: string
  ) {
    if (this.index == null) {
      this.index = null;
    }
    if (this.quantity == null) {
      this.quantity = null;
    }
    if (this.dimension == null) {
      this.dimension = null;
    }
    if (this.grossWeight == null) {
      this.grossWeight = null;
    }
  }
}

export class TruckingVolumeGrossWeight {
  constructor(
    public index?: string,
    public maxLength?: string,
    public maxWidth?: string,
    public maxHeight?: string,
    public maxWeightPerPackage?: string
  ) {
    if (this.index == null) {
      this.index = null;
    }
    if (this.maxLength == null) {
      this.maxLength = null;
    }
    if (this.maxWidth == null) {
      this.maxWidth = null;
    }
    if (this.maxHeight == null) {
      this.maxHeight = null;
    }
    if (this.maxWeightPerPackage == null) {
      this.maxWeightPerPackage = null;
    }
  }
}

export class Quotation1 {
  quotationNo?: string;
  client?: Partner; // "sale/lead/agent" Client -> Partner
  creator?: Contact;
  dateCreate?: string;
  dateModify?: string;
  quotationDate?: string;
  termofService?: string;
  commodity?: Commodity; // Commodities - commodityName
  hsCode?: string;
  sentTo?: Contact;
  pickupAt?: Port;
  deliveryTo?: Port;
  deadlineDelivery?: string;
  volume?: string;
  volumeUnit?: string;
  quantity?: string;
  dimensions?: string;
  grossWeight?: number;
  palletizedPackage?: PalletizedPackage[];
  nonPalletPackageQuantity?: string;
  truckingVolumeGrossWeight?: TruckingVolumeGrossWeight[];
  isExport?: string;
  clearanceTerminal?: string;
  purposeOfImEx?: string;
  specialRequirements?: string;
  targetedRateAndCharges?: string;
  blFee?: string;
  thcOrigin?: string;
  cfsOrigin?: string;
  telexRelease?: string;
  doFee?: string;
  thcDestination?: string;
  cfsDestination?: string;
  handlingFee?: string;
  containerCleaningFee?: string;
  cic?: string;
  awb_SET?: string;
  ams_HBL?: string;
  ams_MBL?: string;
  terminalCharge_KG?: string;
  xray_KG?: string;
  laborCharge?: string;
  currency?: string;
  customsClearanceAtOrigin?: string;
  customsClearanceAtDestination?: string;
  cargoIsUnstackable?: string;
  packageCanBeTilted?: string;
  needExpressService?: string;
  remarks?: string;
  quotationType?: string;
  saveDraft?: string;
  logInfo?: string;
  cargoReadyDateTo?: string;
  cargoReadyDateFrom?: string;
  portToPort?: boolean;
  doorToPort?: boolean;
  portToDoor?: boolean;
  doorToDoor?: boolean;
  constructor() {
    this.quotationNo,
      this.client,
      this.creator,
      this.dateCreate,
      this.dateModify,
      this.quotationDate,
      this.termofService,
      this.commodity,
      this.hsCode,
      this.sentTo,
      this.pickupAt,
      this.deliveryTo,
      this.deadlineDelivery,
      this.volume,
      this.volumeUnit,
      this.quantity,
      this.dimensions,
      this.grossWeight,
      this.palletizedPackage,
      this.nonPalletPackageQuantity,
      this.truckingVolumeGrossWeight,
      this.isExport,
      this.clearanceTerminal,
      this.purposeOfImEx,
      this.specialRequirements,
      this.targetedRateAndCharges,
      this.blFee,
      this.thcOrigin,
      this.cfsOrigin,
      this.telexRelease,
      this.doFee,
      this.thcDestination,
      this.cfsDestination,
      this.handlingFee,
      this.containerCleaningFee,
      this.cic,
      this.awb_SET,
      this.ams_HBL,
      this.ams_MBL,
      this.terminalCharge_KG,
      this.xray_KG,
      this.laborCharge,
      this.currency,
      this.customsClearanceAtOrigin,
      this.customsClearanceAtDestination,
      this.cargoIsUnstackable,
      this.packageCanBeTilted,
      this.needExpressService,
      this.remarks,
      this.quotationType,
      this.saveDraft,
      this.logInfo,
      this.cargoReadyDateTo,
      this.cargoReadyDateFrom,
      this.portToPort,
      this.doorToPort,
      this.portToDoor,
      this.doorToDoor;
  }
}
