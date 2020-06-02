import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { HttpHeaders } from '@angular/common/http';

export const HEADER_POST = new HttpHeaders({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

export const HEADER_PUT = new HttpHeaders({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PUT',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

export const HEADER_DELETE = new HttpHeaders({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'DELETE',
  'Content-Type': 'application/json; charset=UTF-8',
  'Accept': 'application/json'
});

export const CK_EDITOR_CONFIG  = {
  allowedContent: true,
  toolbar: [['Bold', 'Italic', 'Underline', '-', 'NumberedList', 'BulletedList', 'Link', '-', 'CreatePlaceholder']],
  removePlugins: 'elementspath',
  resize_enabled: false,
  extraPlugins: 'font',
  contentsCss: ["body {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;}"],
  autoParagraph: false,
  enterMode: 2,
  editorConfig: ( config ) => { config.extraPlugins = 'divarea'; }
};

export class AppSettings {
  // ============== API ENDPOINT DEFINE HERE ==================
  public static API_ENDPOINT = 'http://127.0.0.1:6666/api/';

  // ======== Configure AG GRID SYSTEM ========================
  public static defaultColDef = {
    width: 120,
    headerComponentParams: { menuIcon: 'fas fa-filter' },
    sortable: true,
    resizable: true,
    filter: true,
    cellStyle: {
      'border-left': "1px dotted skyblue",
    },
  };
  public static frameworkComponents = { agColumnHeader: CustomHeader };
  public static cacheOverflowSize = 1;
  public static maxConcurrentDatasourceRequests = 1000;
  public static infiniteInitialRowCount = 90;
  public static gridOptions = {
    headerHeight: 45,
    rowHeight: 30,
    cacheBlockSize: 90,
    paginationPageSize: 90,
    // rowModelType: 'infinite',
    pagination: true,
    maxBlocksInCache: 1,
    rowModelType: 'serverSide',
    enableSorting: true,
    enableServerSideSorting: true,
    enableServerSideFilter: true,
    serverSideSortingAlwaysResets: true
  };

  public static RcAirCriterions = [
    { id: 1, headerName: 'ID', columnName: 'pricingID' },
    { id: 2, headerName: 'Origin', columnName: 'origin' },
    { id: 3, headerName: 'Destination', columnName: 'destination'},
    { id: 4, headerName: 'Carrier', columnName: 'carrierID' },
    { id: 5, headerName: 'Currency', columnName: 'currency' },
    { id: 6, headerName: 'Min(Qty)', columnName: 'min' },
    { id: 7, headerName: '-45(KG)', columnName: 'level1' },
    { id: 8, headerName: '+45(KG)', columnName: 'level2' },
    { id: 9, headerName: '+100(KG)', columnName: 'level3' },
    { id: 10, headerName: '+300(KG)', columnName: 'level4' },
    { id: 11, headerName: '+500(KG)', columnName: 'level5' },
    { id: 12, headerName: '+1000(KG)', columnName: 'level6' },
    { id: 13, headerName: 'FSC', columnName: 'fsc' },
    { id: 14, headerName: 'ssc', columnName: 'ssc' },
    { id: 15, headerName: 'AWB', columnName: 'awbSET' },
    { id: 16, headerName: 'AMS', columnName: 'amsHBL' },
    { id: 17, headerName: 'Other Charges', columnName: 'otherCharges' },
    { id: 18, headerName: 'T/T', columnName: 'transitTime' },
    { id: 19, headerName: 'Freq.', columnName: 'frequency' },
    { id: 20, headerName: 'Cut off', columnName: 'cutOff' },
    { id: 21, headerName: 'Routing', columnName: 'routing' },
    { id: 21, headerName: 'Updated By', columnName: 'updatedBy' },
    { id: 21, headerName: 'Notes', columnName: 'notes' }
  ];

  public static   RCAirSearch = [
    { headerName: 'ID', columnName: 'pricingID', isCheck: false, value: null, type: 'text' },
    { headerName: 'Origin', columnName: 'origin', isCheck: false, value: null, type: 'text' },
    { headerName: 'Destination', columnName: 'destination', isCheck: false, value: null, type: 'text' },
    { headerName: 'Carrier', columnName: 'carrierID', isCheck: false, value: null, type: 'text' },
    { headerName: 'Currency', columnName: 'currency', isCheck: false, value: null, type: 'text' },
    { headerName: 'Min(Qty)', columnName: 'min', isCheck: false, value: null, type: 'text' },
    { headerName: '-45(KG)', columnName: 'level1', isCheck: false, value: null, type: 'text' },
    { headerName: '+45(KG)', columnName: 'level2', isCheck: false, value: null, type: 'text' },
    { headerName: '+100(KG)', columnName: 'level3', isCheck: false, value: null, type: 'text' },
    { headerName: '+300(KG)', columnName: 'level4', isCheck: false, value: null, type: 'text' },
    { headerName: '+500(KG)', columnName: 'level5', isCheck: false, value: null, type: 'text' },
    { headerName: '+1000(KG)', columnName: 'level6', isCheck: false, value: null, type: 'text' },
    { headerName: 'FSC', columnName: 'fsc', isCheck: false, value: null, type: 'text' },
    { headerName: 'ssc', columnName: 'ssc', isCheck: false, value: null, type: 'text' },
    { headerName: 'AWB', columnName: 'awbSET', isCheck: false, value: null, type: 'text' },
    { headerName: 'AMS', columnName: 'amsHBL', isCheck: false, value: null, type: 'text' },
    { headerName: 'Other Charges', columnName: 'otherCharges', isCheck: false, value: null, type: 'text' },
    { headerName: 'T/T', columnName: 'transitTime', isCheck: false, value: null, type: 'text' },
    { headerName: 'Freq.', columnName: 'frequency', isCheck: false, value: null, type: 'text' },
    { headerName: 'Cut off', columnName: 'cutOff', isCheck: false, value: null, type: 'text' },
    { headerName: 'Routing', columnName: 'routing', isCheck: false, value: null, type: 'text' },
    { headerName: 'Updated By', columnName: 'updatedBy', isCheck: false, value: null, type: 'text' },
    { headerName: 'Notes', columnName: 'notes', isCheck: false, value: null, type: 'text' },
    { headerName: 'Valid From', columnName: 'validDateFrom', isCheck: false, value: null, type: 'datetime' },
    { headerName: 'Valid To', columnName: 'validDateTo', isCheck: false, value: null, type: 'datetime' }
  ];

  public static RcSeaCriterions = [
    { id: 1, headerName: 'ID', columnName: 'pricingID'},
    { id: 2, headerName: 'POL', columnName: 'portofLoading'},
    { id: 3, headerName: 'POD', columnName: 'portofDischarge'},
    { id: 4, headerName: 'Transit port', columnName: 'transitPort'},
    { id: 5, headerName: 'Freight charge', columnName: 'freightChargeLCL'},
    { id: 6, headerName: 'Minimum charge', columnName: 'minimumChargeLCL'},
    { id: 7, headerName: 'Currency', columnName: 'currency'},
    { id: 8, headerName: 'Transit time', columnName: 'transitTime'},
    { id: 9, headerName: 'Frequency', columnName: 'frequency'},
    { id: 10, headerName: 'Cutoff', columnName: 'cutOff'},
    { id: 11, headerName: 'Notes', columnName: 'notes'}
  ];

  public static RCSeaSearch = [
    { headerName: 'ID', columnName: 'pricingID', isCheck: false, value: null, type: 'text'},
    { headerName: 'POL', columnName: 'portofLoading', isCheck: false, value: null, type: 'text'},
    { headerName: 'POD', columnName: 'portofDischarge', isCheck: false, value: null, type: 'text'},
    { headerName: 'Transit port', columnName: 'transitPort', isCheck: false, value: null, type: 'text'},
    { headerName: 'Freight charge', columnName: 'freightChargeLCL', isCheck: false, value: null, type: 'text'},
    { headerName: 'Minimum charge', columnName: 'minimumChargeLCL', isCheck: false, value: null, type: 'text'},
    { headerName: 'Currency', columnName: 'currency', isCheck: false, value: null, type: 'text'},
    { headerName: 'Transit time', columnName: 'transitTime', isCheck: false, value: null, type: 'text'},
    { headerName: 'Frequency', columnName: 'frequency', isCheck: false, value: null, type: 'text'},
    { headerName: 'Valid from', columnName: 'validDateFrom', isCheck: false, value: null, type: 'datetime'},
    { headerName: 'Valid to', columnName: 'validDateTo', isCheck: false, value: null, type: 'datetime'},
    { headerName: 'Cutoff', columnName: 'cutOff', isCheck: false, value: null, type: 'text'},
    { headerName: 'Notes', columnName: 'notes', isCheck: false, value: null, type: 'text'}
  ];

  public static RcTruckingCriterions = [
    { id: 1, headerName: 'ID', columnName: 'pricingID' },
    { id: 2, headerName: 'Pricing ID', columnName: 'pricingID' },
    { id: 3, headerName: 'Creator', columnName: 'creator' },
    { id: 4, headerName: 'Pickup City', columnName: 'pickupCity' },
    { id: 5, headerName: 'Pickup Area', columnName: 'pickupArea' },
    { id: 6, headerName: 'Delivery City', columnName: 'deliveryCity' },
    { id: 7, headerName: 'Delivery Area', columnName: 'deliveryArea' },
    { id: 8, headerName: '20\' truck', columnName: 'truck20' },
    { id: 9, headerName: '40\' truck', columnName: 'truck40' },
    { id: 10, headerName: '500kgs Truck', columnName: 'truck500kgs' },
    { id: 11, headerName: '1-ton truck', columnName: 'truckTonLevel1' },
    { id: 12, headerName: '1.5-ton truck', columnName: 'truckTonLevel2' },
    { id: 13, headerName: '2-ton truck', columnName: 'truckTonLevel3' },
    { id: 14, headerName: '2.5-ton truck', columnName: 'truckTonLevel4' },
    { id: 15, headerName: '3.5-ton truck', columnName: 'truckTonLevel5' },
    { id: 16, headerName: '5-ton truck', columnName: 'truckTonLevel6' },
    { id: 17, headerName: '6.5-ton truck', columnName: 'truckTonLevel7' },
    { id: 28, headerName: '8-ton truck', columnName: 'truckTonLevel8' },
    { id: 29, headerName: '9.5-ton truck', columnName: 'truckTonLevel9' },
    { id: 30, headerName: '11-ton truck', columnName: 'truckTonLevel10' },
    { id: 31, headerName: '13-ton truck', columnName: 'truckTonLevel11' },
    { id: 32, headerName: '15-ton truck', columnName: 'truckTonLevel12' },
    { id: 33, headerName: '16.5-ton truck', columnName: 'truckTonLevel13' },
    { id: 34, headerName: '18-ton truck', columnName: 'truckTonLevel14' },
    { id: 35, headerName: '20-ton truck', columnName: 'truckTonLevel15' },
    { id: 36, headerName: '22-ton truck', columnName: 'truckTonLevel16' },
    { id: 37, headerName: 'Notes', columnName: 'notes' },
    { id: 38, headerName: 'Free Detention Time', columnName: 'freeDetentionTime' },
    { id: 39, headerName: 'Detention Charge', columnName: 'detentionCharge' },
    { id: 40, headerName: 'Updated By', columnName: 'updatedBy' },
    { id: 41, headerName: 'Currency', columnName: 'currency'  }
  ];

  public static RCTruckingSearch = [
    { headerName: 'Pricing ID', columnName: 'pricingID', isCheck: false, value: null, type: 'text' },
    { headerName: 'Creator', columnName: 'creator', isCheck: false, value: null, type: 'text' },
    { headerName: 'Date Create', columnName: 'dateCreate', isCheck: false, value: null, type: 'datetime' },
    { headerName: 'Date Modify', columnName: 'dateModify', isCheck: false, value: null, type: 'datetime' },
    { headerName: 'Pickup City', columnName: 'pickupCity', isCheck: false, value: null, type: 'text' },
    { headerName: 'Pickup Area', columnName: 'pickupArea', isCheck: false, value: null, type: 'text' },
    { headerName: 'Delivery City', columnName: 'deliveryCity', isCheck: false, value: null, type: 'text' },
    { headerName: 'Delivery Area', columnName: 'deliveryArea', isCheck: false, value: null, type: 'text' },
    { headerName: '20\' truck', columnName: 'truck20', isCheck: false, value: null, type: 'text' },
    { headerName: '40\' truck', columnName: 'truck40', isCheck: false, value: null, type: 'text' },
    { headerName: '500kgs Truck', columnName: 'truck500kgs', isCheck: false, value: null, type: 'text' },
    { headerName: '1-ton truck', columnName: 'truckTonLevel1', isCheck: false, value: null, type: 'text' },
    { headerName: '1.5-ton truck', columnName: 'truckTonLevel2', isCheck: false, value: null, type: 'text' },
    { headerName: '2-ton truck', columnName: 'truckTonLevel3', isCheck: false, value: null, type: 'text' },
    { headerName: '2.5-ton truck', columnName: 'truckTonLevel4', isCheck: false, value: null, type: 'text' },
    { headerName: '3.5-ton truck', columnName: 'truckTonLevel5', isCheck: false, value: null, type: 'text' },
    { headerName: '5-ton truck', columnName: 'truckTonLevel6', isCheck: false, value: null, type: 'text' },
    { headerName: '6.5-ton truck', columnName: 'truckTonLevel7', isCheck: false, value: null, type: 'text' },
    { headerName: '8-ton truck', columnName: 'truckTonLevel8', isCheck: false, value: null, type: 'text' },
    { headerName: '9.5-ton truck', columnName: 'truckTonLevel9', isCheck: false, value: null, type: 'text' },
    { headerName: '11-ton truck', columnName: 'truckTonLevel10', isCheck: false, value: null, type: 'text' },
    { headerName: '13-ton truck', columnName: 'truckTonLevel11', isCheck: false, value: null, type: 'text' },
    { headerName: '15-ton truck', columnName: 'truckTonLevel12', isCheck: false, value: null, type: 'text' },
    { headerName: '16.5-ton truck', columnName: 'truckTonLevel13', isCheck: false, value: null, type: 'text' },
    { headerName: '18-ton truck', columnName: 'truckTonLevel14', isCheck: false, value: null, type: 'text' },
    { headerName: '20-ton truck', columnName: 'truckTonLevel15', isCheck: false, value: null, type: 'text' },
    { headerName: '22-ton truck', columnName: 'truckTonLevel16', isCheck: false, value: null, type: 'text' },
    { headerName: 'Notes', columnName: 'notes', isCheck: false, value: null, type: 'text' },
    { headerName: 'Free Detention Time', columnName: 'freeDetentionTime', isCheck: false, value: null, type: 'text' },
    { headerName: 'Detention Charge', columnName: 'detentionCharge', isCheck: false, value: null, type: 'text' },
    { headerName: 'Valid Date From', columnName: 'validDateFrom', isCheck: false, value: null, type: 'datetime' },
    { headerName: 'Valid Date To', columnName: 'validDateTo', isCheck: false, value: null, type: 'datetime' },
    { headerName: 'Updated By', columnName: 'updatedBy', isCheck: false, value: null, type: 'text' },
    { headerName: 'Currency', columnName: 'currency', isCheck: false, value: null, type: 'text' }
  ];

  public static RcCustomsClearanceCriterions = [
    { id: 1, headerName: 'ID', columnName: 'pricingID'},
    { id: 2, headerName: 'Creator', columnName: 'creator'},
    { id: 3, headerName: 'Terminal', columnName: 'terminal'},
    { id: 4, headerName: 'Purpose Of Import/Export', columnName: 'purposeOfImEx'},
    { id: 5, headerName: 'Channel', columnName: 'channel'},
    { id: 6, headerName: 'min', columnName: 'min'},
    { id: 7, headerName: '20\'', columnName: 'container20'},
    { id: 8, headerName: '40\'', columnName: 'container40'},
    { id: 9, headerName: 'Lcl', columnName: 'lcl'},
    { id: 10, headerName: 'Air', columnName: 'air'},
    { id: 11, headerName: 'Currency', columnName: 'currency'},
    { id: 12, headerName: 'Excluded Commodity', columnName: 'excludedCommodity'},
    { id: 13, headerName: 'Notes', columnName: 'notes'},
    { id: 14, headerName: 'Service', columnName: 'service'},
    { id: 15, headerName: 'Fee', columnName: 'fee'},
    { id: 16, headerName: 'Unit', columnName: 'unit'},
    { id: 17, headerName: 'Company', columnName: 'companyID'},
    { id: 18, headerName: 'Updated By', columnName: 'updatedBy'},
    { id: 19, headerName: 'carrier', columnName: 'carrier'}
  ];

  public static RcCustomsClearance = [
    { headerName: 'ID', columnName: 'pricingID', isCheck: false, value: null, type: 'text'},
    { headerName: 'Creator', columnName: 'creator', isCheck: false, value: null, type: 'text'},
    { headerName: 'Date Create', columnName: 'dateCreate', isCheck: false, value: null, type: 'datetime'},
    { headerName: 'Date Modify', columnName: 'dateModify', isCheck: false, value: null, type: 'datetime'},
    { headerName: 'Terminal', columnName: 'terminal', isCheck: false, value: null, type: 'text'},
    { headerName: 'PurposeOfImEx', columnName: 'purposeOfImEx', isCheck: false, value: null, type: 'text'},
    { headerName: 'Channel', columnName: 'channel', isCheck: false, value: null, type: 'text'},
    { headerName: 'Min', columnName: 'min', isCheck: false, value: null, type: 'text'},
    { headerName: '20\'', columnName: 'container20', isCheck: false, value: null, type: 'text'},
    { headerName: '40\'', columnName: 'container40', isCheck: false, value: null, type: 'text'},
    { headerName: 'Lcl', columnName: 'lcl', isCheck: false, value: null, type: 'text'},
    { headerName: 'Air', columnName: 'air', isCheck: false, value: null, type: 'text'},
    { headerName: 'Currency', columnName: 'currency', isCheck: false, value: null, type: 'text'},
    { headerName: 'Excluded Commodity', columnName: 'excludedCommodity', isCheck: false, value: null, type: 'text'},
    { headerName: 'Notes', columnName: 'notes', isCheck: false, value: null, type: 'text'},
    { headerName: 'Service', columnName: 'service', isCheck: false, value: null, type: 'text'},
    { headerName: 'Fee', columnName: 'fee', isCheck: false, value: null, type: 'text'},
    { headerName: 'Unit', columnName: 'unit', isCheck: false, value: null, type: 'text'},
    { headerName: 'Company', columnName: 'companyID', isCheck: false, value: null, type: 'text'},
    { headerName: 'Valid Date From', columnName: 'validDateFrom', isCheck: false, value: null, type: 'datetime'},
    { headerName: 'Valid Date To', columnName: 'validDateTo', isCheck: false, value: null, type: 'datetime'},
    { headerName: 'Updated By', columnName: 'updatedBy', isCheck: false, value: null, type: 'text'},
    { headerName: 'carrier', columnName: 'carrier', isCheck: false, value: null, type: 'text'}
  ];

  public static   quotationSentSearch = [
    { headerName: 'ID', columnName: 'quotationNo', isCheck: false, value: null, type: 'text' },
    { headerName: 'Type', columnName: 'quotationType', isCheck: false, value: null, type: 'text' },
    { headerName: 'Client', columnName: 'client', isCheck: false, value: null, type: 'text' },
    { headerName: 'Commodity', columnName: 'commodity', isCheck: false, value: null, type: 'text' },
    { headerName: 'POL', columnName: 'pickupAt', isCheck: false, value: null, type: 'text' },
    { headerName: 'POD', columnName: 'deliveryTo', isCheck: false, value: null, type: 'text' },
    { headerName: 'Sent to', columnName: 'sentTo', isCheck: false, value: null, type: 'text' }
  ];

  public static quotationCriterions = [
    { id: 1, headerName: 'ID', columnName: 'quotationNo' },
    { id: 2, headerName: 'Type', columnName: 'quotationType' },
    { id: 3, headerName: 'Client', columnName: 'client'},
    { id: 4, headerName: 'Commodity', columnName: 'commodity' },
    { id: 5, headerName: 'POL', columnName: 'pickupAt' },
    { id: 6, headerName: 'POD', columnName: 'deliveryTo' },
    { id: 7, headerName: 'Sent to', columnName: 'sentTo' }
  ];
}
