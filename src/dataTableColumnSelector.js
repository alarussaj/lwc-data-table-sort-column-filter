import { LightningElement, api } from "lwc";

const DUAL_LIST_BOX = {
    sourceLabel: "Available Fields",
    selectedLabel: "Selected Fields",
    fieldLevelHelp: "Select fields to display",
    label: "Select fields to display"
};

const TITLE = "Select Fields to Display";

export default class DataTableColumnSelector extends LightningElement {
    @api title = TITLE;
    @api label = DUAL_LIST_BOX.label;
    @api sourceLabel = DUAL_LIST_BOX.sourceLabel;
    @api selectedLabel = DUAL_LIST_BOX.selectedLabel;
    @api fieldLevelHelp = DUAL_LIST_BOX.fieldLevelHelp;

    // Template properties
    modalError;

    // Private properties
    _showModal = false;
    _selectedOptions;
    _requiredOptions;
    _options;
    _columns;

    get showModal() {
        return this._showModal;
    }

    // PUBLIC GETTERS/SETTERS
    @api
    get options() {
        return this._options;
    }

    set options(options = []) {
        console.log(JSON.parse(JSON.stringify(options)));
        this._options = [...options];
    }

    @api
    get selectedOptions() {
        return this._selectedOptions;
    }

    set selectedOptions(selectedOptions = []) {;
        this._selectedOptions = [...selectedOptions];
    }

    @api
    get requiredOptions() {
        return this._requiredOptions;
    }

    set requiredOptions(requiredOptions = []) {
        this._requiredOptions = [...requiredOptions];
    }

    @api
    show() {
        console.log("show");
        this._showModal = true;
    }

    // EVENT HANDLERS

    /**
     * List box change event
     * @param {object} event
     */
    handleChange(event) {
        console.log(event.detail.value);
        this._selectedOptions = event.detail.value;
    }

    /**
     * Close modal event
     */
    handleModalReset() {
        this._showModal = false;
    }

    handleSave() {
        const saveEvent = new CustomEvent("save", { detail: this._selectedOptions });
        this.dispatchEvent(saveEvent);
        this._showModal = false;
    }
}