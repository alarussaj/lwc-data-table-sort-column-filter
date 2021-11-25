import { LightningElement, api } from "lwc";

const ICON_VARIANT = {
    on: "brand",
    off: "border"
}

export default class DatatableStatusAction extends LightningElement {
    static delegatesFocus = true;
    @api recordId;
    @api iconName;
    @api iconVariantWhenOn = ICON_VARIANT.on;
    @api iconVariantWhenOff = ICON_VARIANT.off;
    @api valueWhenOn;
    @api valueWhenOff;

    @api get isSelected() {
        return this._isSelected;
    }

    set isSelected(value) {
        this._isSelected = value;
    }

    get variant() {
        return this.isSelected ? this.iconVariantWhenOn : this.iconVariantWhenOff;
    }

    get title() {
        return this.value;
    }

    get value() {
        return this.isSelected ? this.valueWhenOn : this.valueWhenOff;
    }

    
    _isSelected;

    // eslint-disable-next-line no-unused-vars
    handleChange(event) {
        this._isSelected = !this._isSelected;
        const changeEvent = new CustomEvent("statuschange", {
            composed: true,
            bubbles: true,
            cancelable: true,
            detail: {
                recordId: this.recordId,
                value: this.value
            }
        });
        this.dispatchEvent(changeEvent);
    }
}