import { url } from "inspector";

export class Menu {
  id: number;
  name: string;
  child: Menuchild[];
}

export class Menuchild {
  id: number;
  name: string;
  url: string;
  clicked: boolean;
  child: Menuchild1[];
}
export class Menuchild1 {
  id: number;
  name: string;
  url: string;
  clicked: boolean;
}

export const Menus: Menu[] = [
  {
    id: 1,
    name: "SYSTEM",
    child: [
      {
        id: 1,
        name: "Configuration",
        url: "#",
        clicked: false,
        child: [
          {
            id: 1,
            name: "ID configuration ",
            url: "#",
            clicked: false,
          },
          {
            id: 2,
            name: "Branch office configuration",
            url: "#",
            clicked: false,
          },
          { id: 3, name: "Department configuration", url: "#", clicked: false },
          { id: 4, name: "User configuration", url: "#", clicked: false },
        ],
      },
      {
        id: 2,
        name: "Approval authorization",
        url: "#",
        clicked: true,
        child: null,
      },
      {
        id: 3,
        name: "User activity log",
        url: "#",
        clicked: true,
        child: null,
      },
      {
        id: 4,
        name: "Database backup",
        url: "#",
        clicked: true,
        child: null,
      },
      {
        id: 5,
        name: " Change password",
        url: "#",
        clicked: true,
        child: null,
      },
    ],
  },
  {
    id: 2,
    name: "CATALOGUE",
    child: [
      {
        id: 1,
        name: "Partners",
        url: "#",
        clicked: false,
        child: [
          {
            id: 1,
            name: "Sales lead",
            url: "lead",
            clicked: true,
          },
          {
            id: 2,
            name: "Customer",
            url: "customer",
            clicked: true,
          },
          {
            id: 3,
            name: "Carrier",
            url: "carrier",
            clicked: true,
          },
          {
            id: 4,
            name: "Agent",
            url: "agent",
            clicked: true,
          },
          {
            id: 5,
            name: "Vendor",
            url: "vendor",
            clicked: true,
          },
        ],
      },

      {
        id: 2,
        name: "Port index",
        url: "port-index",
        clicked: true,
        child: null,
      },
      {
        id: 3,
        name: "Currency & Exchange rate",
        url: "currency",
        clicked: true,
        child: null,
      },
      {
        id: 4,
        name: "Commodity",
        url: "commodity",
        clicked: true,
        child: null,
      },
      {
        id: 5,
        name: "Charge list",
        url: "#",
        clicked: false,
        child: null,
      },
      {
        id: 6,
        name: "Measurement system",
        url: "measurement",
        clicked: true,
        child: null,
      },
      {
        id: 7,
        name: "SOC list",
        url: "container",
        clicked: false,
        child: null,
      },
      {
        id: 8,
        name: "Shipment type",
        url: "shipmenttype",
        clicked: true,
        child: null,
      },
      {
        id: 9,
        name: "Handling task",
        url: "handlingtask",
        clicked: false,
        child: null,
      },
    ],
  },
  {
    id: 3,
    name: "SALES EXECUTIVES",
    child: [
      {
        id: 1,
        name: "Vessel Schedules",
        url: "sales-executive/vessel-schedules",
        clicked: true,
        child: null,
      },
      {
        id: 2,
        name: "Rate & Charges",
        url: "",
        clicked: false,
        child: [
          {
            id: 1,
            name: "Airfreight tariff",
            url: "sales-executive/rate-charges/air-freight",
            clicked: true,
          },
          {
            id: 2,
            name: "FCL tariff",
            url: "sales-executive/rate-charges/fcl-tariff",
            clicked: true,
          },
          {
            id: 3,
            name: "LCL tariff",
            url: "sales-executive/rate-charges/lcl-tariff",
            clicked: true,
          },
          {
            id: 4,
            name: "Trucking tariff",
            url: "sales-executive/rate-charges/trucking-charges",
            clicked: true,
          },
          {
            id: 5,
            name: "Customs clearance",
            url: "sales-executive/rate-charges/customs-clearance",
            clicked: true,
          },
          {
            id: 6,
            name: "Local charges",
            url: "sales-executive/rate-charges/local-charge-tariff",
            clicked: true,
          },
        ],
      },
      {
        id: 3,
        name: "Service Inquiry",
        url: "sales-executive/service-inquiry",
        clicked: true,
        child: null,
      },
      {
        id: 4,
        name: "Quotation",
        url: "quotation",
        clicked: true,
        child: null,
      },
      {
        id: 5,
        name: "Booking request",
        url: "booking",
        clicked: true,
        child: null,
      },
      {
        id: 6,
        name: "Internal booking request",
        url: "pl-sheet",
        clicked: true,
        child: null,
      },
      {
        id: 7,
        name: "Booking confirmation",
        url: "pl-sheet",
        clicked: true,
        child: null,
      },
      {
        id: 8,
        name: "Profit & loss",
        url: "pl-sheet",
        clicked: true,
        child: null,
      },
    ],
  },
  {
    id: 4,
    name: "ACCOUNTING",
    child: [
      {
        id: 1,
        name: "Local Receivable Invoice",
        url: "new-vat-invoice",
        clicked: false,
        child: [
          {
            id: 1,
            name: "Issue VAT Invoice",
            url: "",
            clicked: false,
          },
          {
            id: 2,
            name: "VAT Invoice Management",
            url: "",
            clicked: false,
          },
          {
            id: 3,
            name: "Create invoice list",
            url: "",
            clicked: false,
          },
          {
            id: 4,
            name: "VAT invoice issuance report",
            url: "",
            clicked: false,
          },
          {
            id: 5,
            name: "Debit Note",
            url: "",
            clicked: false,
          },
        ],
      },
      {
        id: 2,
        name: "Local Payable Invoice",
        url: "",
        clicked: false,
        child: [
          {
            id: 1,
            name: "Input Payable Invoice",
            url: "",
            clicked: false,
          },
          {
            id: 2,
            name: "Import Payable Invoice to AV",
            url: "",
            clicked: false,
          },
        ],
      },
      {
        id: 3,
        name: "Oversea Invoice",
        url: "",
        clicked: false,
        child: [
          {
            id: 1,
            name: "Issue SOA",
            url: "",
            clicked: false,
          },
          {
            id: 2,
            name: "Create invoice list",
            url: "",
            clicked: false,
          },
        ],
      },
      {
        id: 4,
        name: "Payment advance & settlement",
        url: "",
        clicked: false,
        child: [
          {
            id: 1,
            name: "Advance Payment",
            url: "",
            clicked: false,
          },
          {
            id: 2,
            name: "Unlock Settlement",
            url: "",
            clicked: false,
          },
        ],
      },
      {
        id: 5,
        name: "ARAP report - detailed",
        url: "",
        clicked: true,
        child: null,
      },
      {
        id: 6,
        name: "Overdue debts",
        url: "",
        clicked: true,
        child: null,
      },
      {
        id: 7,
        name: "Aging report - detailed",
        url: "",
        clicked: true,
        child: null,
      },
      {
        id: 8,
        name: "Payment on behalf",
        url: "",
        clicked: true,
        child: null,
      },
      {
        id: 9,
        name: "Credit Note - Other",
        url: "",
        clicked: true,
        child: null,
      },
      {
        id: 10,
        name: "Monitor Bank Account",
        url: "sheet-debit-record",
        clicked: true,
        child: null,
      },
    ],
  },
  {
    id: 5,
    name: "DOCUMENTATIONS",
    child: [
      {
        id: 1,
        name: "Express",
        url: "express",
        clicked: true,
        child: null,
      },
      {
        id: 2,
        name: "Outbound",
        url: "",
        clicked: false,
        child: [
          {
            id: 1,
            name: "Outbound Air",
            url: "",
            clicked: false,
          },
          {
            id: 2,
            name: "Outbound FCL",
            url: "",
            clicked: false,
          },
          {
            id: 3,
            name: "Outbound LCL",
            url: "",
            clicked: false,
          },
          
        ],
      },
      {
        id: 3,
        name: "Inbound",
        url: "",
        clicked: false,
        child: [
            {
              id: 1,
              name: "Inbound Air",
              url: "",
              clicked: false,
            },
            {
              id: 2,
              name: "Inbound FCL",
              url: "",
              clicked: false,
            },
            {
              id: 3,
              name: "Inbound LCL",
              url: "",
              clicked: false,
            },
            
          ],
      },
      {
        id: 4,
        name: "Customs clearance",
        url: "",
        clicked: true,
        child: null,
      },
      {
        id: 5,
        name: "Trucking",
        url: "",
        clicked: true,
        child: null,
      },
      {
        id: 6,
        name: "Warehouse",
        url: "",
        clicked: true,
        child: null,
      },
      {
        id: 7,
        name: "EDI",
        url: "",
        clicked: true,
        child: null,
      },
      
    ],
  },
  {
    id: 7,
    name: "REPORTS",
    child: [
      {
        id: 1,
        name: "Revenue & Profit",
        url: "",
        clicked: false,
        child: [{
            id: 1,
            name: "Gross Profit",
            url: "",
            clicked: false,
          },
          {
            id: 2,
            name: "Salesperson's Profit Report",
            url: "",
            clicked: false,
          },
          {
            id: 3,
            name: "Profit Ranking by Country",
            url: "",
            clicked: false,
          },
          {
            id: 4,
            name: "Profit Ranking by Office",
            url: "",
            clicked: false,
          },
          {
            id: 5,
            name: "Profit Ranking by Department",
            url: "",
            clicked: false,
          },],
      },
      {
        id: 2,
        name: "Volume",
        url: "",
        clicked: false,
        child: [{
            id: 1,
            name: "General",
            url: "",
            clicked: false,
          },
          {
            id: 2,
            name: "By route",
            url: "",
            clicked: false,
          },
          ],
      },
      {
        id: 3,
        name: "Performance",
        url: "",
        clicked: false,
        child: [{
            id: 1,
            name: "Booking",
            url: "",
            clicked: false,
          },
          {
            id: 2,
            name: "Handling",
            url: "",
            clicked: false,
          },
          {
            id: 3,
            name: "Target completion",
            url: "",
            clicked: false,
          },],
      },
      {
        id: 4,
        name: "ARAP report - Summary",
        url: "",
        clicked: true,
        child: null,
      },
      {
        id: 5,
        name: " AR payment history",
        url: "",
        clicked: true,
        child: null,
      },
      {
        id: 6,
        name: "AP payment history",
        url: "",
        clicked: true,
        child: null,
      },
      {
        id: 7,
        name: "Aging report - Summary",
        url: "",
        clicked: true,
        child: null,
      },
      
    ],
  },
  {
    id: 6,
    name: "TOOLS",
    child: [
      {
        id: 1,
        name: "File Administrator",
        url: "file-administrator",
        clicked: true,
        child: null,
      },
      {
        id: 2,
        name: "File History",
        url: "payment-request-administrator",
        clicked: true,
        child: null,
      },
      
    ],
  },
  
  {
    id: 8,
    name: "HELP",
    child: [
      {
        id: 1,
        name: "User Guide",
        url: "",
        clicked: true,
        child: null,
      },
      {
        id: 2,
        name: "Live Update",
        url: "",
        clicked: true,
        child: null,
      },
      
    ],
  },
];
