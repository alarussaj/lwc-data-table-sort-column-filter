import { LightningElement, track } from "lwc";
import { DATA, sortTable, filterColumns } from "./datatableUtils.js";

const ACTIONS = [
  {
    label: "View",
    name: "view" 
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
        type: "datatableStatusAction",
        fieldName: "Status__c",
        sortable: true,
        typeAttributes: {
            recordId: { fieldName: "Id" },
            iconName: "action:update_status",
            valueWhenOn: "Available",
            valueWhenOff: "Unavailable",
            isSelected: { fieldName: "isSelected" }
        }
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

const DELAY = 300;

export default class App extends LightningElement {
  options = OPTIONS;
  defaultSortDirection = 'asc';
  sortDirection = 'asc';
  sortedBy;
  defaultColumns = DEFAULT_COLUMNS;
  isLoading = false;
  _columns;
  @track _data = DATA;

  get columns() {
    return this._columns ?? [];
  }

  connectedCallback() {
    this.setfilteredColumns(this.defaultColumns);
  }

  get data() {
    return this._data ?? [];
  }

  async handleSort(event) {
    this.isLoading = true;
    const { fieldName: sortedBy, sortDirection } = event.detail;
    this._data = await sortTable(this._data, sortedBy, sortDirection);
    this.sortDirection = sortDirection;
    this.sortedBy = sortedBy;
    this.cancelLoading();
  }

  async setfilteredColumns(selectedColumns) {
    this._columns = await filterColumns(COLUMNS, selectedColumns);
  }

  cancelLoading() {
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setTimeout(() => {
        this.isLoading = false;
    }, DELAY);
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
        default:
    }
  }

  handleStatusChange(event) {
    this.isLoading = true;
    const { recordId, value } = event.detail;
    const data = [...this._data];
    const index = data.findIndex((item) => item.Id === recordId);
    data[index].Status__c = value;
    console.log(data[index].Status__c);
    this._data = data;
    this.cancelLoading();
  }

  handleOpenSelectFields() {
    this.template.querySelector("c-datatable-column-selector").show();
  }

  handleDummyClick() {
    // dummy click
  }
}
