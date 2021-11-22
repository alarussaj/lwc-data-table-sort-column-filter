import { LightningElement, api } from 'lwc';

export default class ModalWrapper extends LightningElement {
    @api title;     // modal title
    @api loading;   // boolean to display spinner
    @api size;      // size of the modal, in following order: no size, small, medium, large
    @api error;     // boolean to display error indicator (not error message)

    firstRender = false;

    /**
     * Attaches key listeners to first & last element to contain tabbing on render
     */
    renderedCallback() {
        // hidden elements to keep tab w/in modal
        let first = this.template.querySelector('.tabFirst');
        let last = this.template.querySelector('.tabLast');

        if (!this.firstRender) {
            first.focus();

            // if on first element and shift-tab clicked, go to last element
            first.addEventListener('keydown', e => {
                if (e.which === 9 && e.shiftKey) {
                    e.preventDefault();
                    last.focus();
                }
            });

            // if on last element and tab clicked, go to first element
            last.addEventListener('keydown', e => {
                if (e.which === 9 && !e.shiftKey) {
                    e.preventDefault();
                    first.focus();
                }
            });

            this.firstRender = true;
            this.dispatchEvent(new CustomEvent('loaded', { detail: this.title }));
        }
    }

    /**
     * Sends event to container component when modal is closed
     */
    close() {
        this.dispatchEvent(new CustomEvent('close', { detail: this.title }));
    }

    /**
     * Determines size class to apply to modal container (modal width) based on size variable
     *
     * @return {string} Modal container classes w or w/o calculated size class
     */
    get containerClasses() {
        let sizeClass = this.size ? 'slds-modal_' + this.size : '';
        return 'slds-modal slds-fade-in-open ' + sizeClass;
    }
}