import LightningDatatable from "lightning/datatable";
import statusAction from "./statusAction.html";

export default class CustomDatatable extends LightningDatatable {
  static customTypes = {
        datatableStatusAction: {
            template: statusAction,
            standardCellLayout: true,
            typeAttributes: [
              "recordId",
              "isSelected",
              "iconName",
              "iconVariantWhenOn",
              "iconVariantWhenOff",
              "valueWhenOn",
              "valueWhenOff"
            ]
        }
    };
}