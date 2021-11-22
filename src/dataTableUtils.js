const DATA =[
  {
    "Id": "00001",
    "Title": "Scan105.tiff",
    "CreatedDate": "2021-11-18T19:00:58.000Z",
    "CreatedById": "Karen Davis",
    "Document_Type__c": "Supporting Documentation",
    "Status__c": "Available",
    "Client_Access__c": "View",
    "Examinee_Access__c": "Upload",
    "FileType": "TIFF",
    "IsFinal__c": true,
    "Case_Number__c": "0003002",
    "iconName": "doctype:image"
  },
  {
    "Id": "00002",
    "Title": "Results.png",
    "CreatedDate": "2021-11-13T17:18:19.000Z",
    "CreatedById": "Karen Davis",
    "Document_Type__c": "Supporting Documentation",
    "Status__c": "Available",
    "Client_Access__c": "View",
    "Examinee_Access__c": "Upload",
    "FileType": "PNG",
    "IsFinal__c": false,
    "Case_Number__c": "0003002",
    "iconName": "doctype:image"
  },
  {
    "Id": "00003",
    "Title": "10001.pdf",
    "CreatedDate": "2021-11-18T19:05:13.000Z",
    "CreatedById": "Karen Davis",
    "Document_Type__c": "Exam Paperwork",
    "Status__c": "Available",
    "Client_Access__c": "View",
    "Examinee_Access__c": "View",
    "FileType": "PDF",
    "IsFinal__c": false,
    "Case_Number__c": "0003003",
    "iconName": "doctype:pdf"
  },
  {
    "Id": "00004",
    "Title": "Exam Authorization_101.pdf",
    "CreatedDate": "2021-11-13T17:18:18.000Z",
    "CreatedById": "Alex Richards",
    "Document_Type__c": "Exam Authorization",
    "Status__c": "Unavailable",
    "Client_Access__c": "None",
    "Examinee_Access__c": "None",
    "FileType": "PDF",
    "IsFinal__c": false,
    "Case_Number__c": "0003004",
    "iconName": "doctype:pdf"
  },
  {
    "Id": "00005",
    "Title": "P3080.pdf",
    "CreatedDate": "2021-11-17T05:52:06.000Z",
    "CreatedById": "John Smith",
    "Document_Type__c": "Exam Paperwork",
    "Status__c": "Unavailable",
    "Client_Access__c": "None",
    "Examinee_Access__c": "None",
    "FileType": "PDF",
    "IsFinal__c": false,
    "Case_Number__c": "0003005",
    "iconName": "doctype:pdf"
  },
  {
    "Id": "00006",
    "Title": "121Binder.pdf",
    "CreatedDate": "2021-11-13T17:27:46.000Z",
    "CreatedById": "John Smith",
    "Document_Type__c": "Exam",
    "Status__c": "Unavailable",
    "Client_Access__c": "None",
    "Examinee_Access__c": "View",
    "FileType": "PDF",
    "IsFinal__c": true,
    "Case_Number__c": "0003006",
    "iconName": "doctype:pdf"
  }
];

const ICON_EXTENSIONS = {
  ai: "ai",
  avi: "video",
  csv: "csv",
  doc: "word",
  docx: "word",
  eps: "eps",
  exe: "exe",
  fla: "flash",
  gdoc: "gdoc",
  gdocs: "gdocs",
  gform: "gform",
  gif: "image",
  gpres: "gpres",
  gsheet: "gsheet",
  htm: "html",
  html: "html",
  jpg: "image",
  lnk: "link",
  mov: "video",
  mp3: "audio",
  mp4: "mp4",
  pdf: "pdf",
  png: "image",
  ppt: "ppt",
  pptx: "ppt",
  psd: "psd",
  rtf: "rtf",
  swf: "flash",
  tiff: "image",
  txt: "txt",
  vsd: "visio",
  vsdx: "visio",
  wav: "audio",
  xls: "excel",
  xlsx: "excel",
  xml: "xml"
};

const SORT_DIRECTIONS = ["asc", "desc"];

class DatatableUtilsError extends Error {
    constructor(message) {
        super(message);
        this.name = "DatatableUtilsError";
    }
}

/**
 * Sorts records in a datatable
 * Example: array.sort(sortBy(sortedBy, sortDirection === "asc" ? 1 : -1));
 * @param {String} field
 * @param {Number} reverse
 * @param {Function} primer (optional)
 */
function sortBy(field, reverse, primer) {
    const key = primer
        ? (x) => {
              return primer(x[field]);
          }
        : (x) => {
              return x[field];
          };

    return (a, b) => {
        a = key(a);
        b = key(b);
        return reverse * ((a > b) - (b > a));
    };
}

function sortTable(data, sortedBy, sortDirection) {
    const promise = new Promise((resolve, reject) => {
        if (!sortedBy) {
            reject(new DatatableUtilsError("The sorted by field is required."));
        }
        if (!sortDirection || !SORT_DIRECTIONS.includes(sortDirection)) {
            reject(new DatatableUtilsError("The sort direction is required and can only be asc or desc."));
        }
        const sortedData = [...data].sort(sortBy(sortedBy, sortDirection === "asc" ? 1 : -1));
        resolve(sortedData);
    }).catch((error) => {
        throw new DatatableUtilsError(`There was an error sorting the table: ${error.message}`);
    });
    return promise;
}

/**
 * Filters the columns to be displayed based upon a collection fieldName values and list of columns to be filtered
 * @param {Object[]]} columns
 * @param {string[]} selectedOptions
 */
async function filterColumns(columns, selectedFieldNames) {
    const promise = new Promise((resolve, reject) => {
        if (!columns?.length || !selectedFieldNames?.length) {
            reject(new DatatableUtilsError("Columns and selected field names cannot be empty."));
        }
        const selectedColumns = [...columns].filter((column) => {
            if (column.type === "action") return true;
            return selectedFieldNames.some((fieldName) => fieldName.toLowerCase() === column?.fieldName?.toLowerCase());
        });
        resolve(selectedColumns);
    }).catch((error) => {
        throw new DatatableUtilsError(`There was an error filtering columns: ${error}`);
    });
    return promise;
}

export { DATA, sortTable, filterColumns }