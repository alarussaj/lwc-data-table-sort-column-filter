import { LightningElement, track } from "lwc";
import { DATA, sortTable, filterColumns } from "./dataTableUtils.js";

const ACTIONS = [
  {
    label: "View",
    name: "view" 
  },
  {
    label: "Change Status",
    name: "change_status" 
  }
];

const COLUMNS = [
    {
        label: "Title",
        type: "button",
        fieldName: "Title",
        title: {
          fieldName: "Title"
        },
        sortable: true,
        cellAttributes: {
            iconName: {
                fieldName: "iconName"
            },
            class: "title-button",
            iconAlternativeText: {
                fieldName: "FileExtension"
            },
            iconClass: "slds-icon_-small",
        },
        typeAttributes: {
            label: { fieldName: "Title" },
            name: "view",
            variant: "base",
        }
    },
    { label: "Document Type", fieldName: "Document_Type__c", sortable: true, wrapText: true },
    {
        label: "Status",
        type: "button-icon",
        fieldName: "Status__c",
        sortable: true,
        title: {
          fieldName: "Status__c"
        },
        typeAttributes: {name: 'change_status', iconName: "action:update_status", variant: { fieldName: "IconVariant" }, alternativeText: { fieldName: "Status__c" }, iconClass: "slds-icon_-small" }
    },
    { label: "Client Portal Access", fieldName: "Client_Access__c", sortable: true},
    { label: "Examinee Portal Access", fieldName: "Examinee_Access__c", sortable: true },
    { label: "Case Number", fieldName: "Case_Number__c", sortable: true },
    {
        label: "Uploaded Date",
        fieldName: "CreatedDate",
        type: "date",
        sortable: true,
        typeAttributes: { year: "2-digit", month: "2-digit", day: "2-digit" }
    },
    { label: "Uploaded By", fieldName: "CreatedById", sortable: true },
    {
        label: "Finalized",
        fieldName: "IsFinal__c",
        type: "boolean",
        sortable: true,
        hideDefaultActions: true,
        initialWidth: 75,
        cellAttributes: { alignment: "center" }
    },
    {
        type: "action",
        typeAttributes: { rowActions: ACTIONS }
    }
];

const DEFAULT_COLUMNS = [
    "view",
    "Title",
    "Document_Type__c",
    "Status__c",
    "Client_Access__c",
    "Examinee_Access__c",
    "IsFinal__c"
];

const OPTIONS = [
    { value: "Title", label: "Title" },
    { value: "Document_Type__c", label: "Document Type" },
    { value: "Status__c", label: "Status" },
    { value: "Client_Access__c", label: "Client Access" },
    { value: "Examinee_Access__c", label: "Examinee Access" },
    { value: "Case_Number__c", label: "Case Number" },
    { value: "CreatedDate", label: "Uploaded Date" },
    { value: "Uploaded By", label: "Uploaded By" },
    { value: "IsFinal__c", label: "Finalized" }
];

export default class App extends LightningElement {
  @track data = DATA;
  options = OPTIONS;
  defaultSortDirection = 'asc';
  sortDirection = 'asc';
  sortedBy;
  defaultColumns = DEFAULT_COLUMNS;
  _columns;

  get columns() {
    return this._columns ?? [];
  }

  connectedCallback() {
    this.setfilteredColumns(this.defaultColumns);
  }

  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    switch (actionName) {
        case 'view':
            alert(row.Title);
            break;
        case 'status_update':
            setStatus(row);
            break;
        default:
    }
  }

  async handleSort(event) {
    const { fieldName: sortedBy, sortDirection } = event.detail;
    this.data = await sortTable(this.data, sortedBy, sortDirection);
    this.sortDirection = sortDirection;
    this.sortedBy = sortedBy;
  }

  async setfilteredColumns(selectedColumns) {
    this._columns = await filterColumns(COLUMNS, selectedColumns);
  }

  handleColumnsSelected(event) {
    const selectedColumns = event.detail;
    this.setfilteredColumns(selectedColumns);
  }

  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    switch (actionName) {
        case "view":
          alert(row.Title);
          break;
        case "change_status":
          this.setStatus(row);
          break;
        default:
    }
  }

  setStatus(row) {
    const data = [...this.data];
    const index = data.findIndex((item) => item.Id === row.Id);
    let status, variant;
    if (row.Status__c === "Available") {
      status = "Unavailable";
      variant = "border";
    } else {
      status = "Available";
      variant = "brand";
    }
    data[index].Status__c = status;
    data[index].IconVariant = variant;
    this.data = data;
  }

  handleOpenSelectFields() {
    this.template.querySelector("c-data-table-column-selector").show();
  }

  handleDummyClick() {
    // dummy click
  }
}
