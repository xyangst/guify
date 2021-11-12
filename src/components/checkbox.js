import ComponentBase from "./component-base.js";

import { default as styles } from "styles/components/checkbox-style.js";

import { default as ContainerPartial } from "./partials/container";
import { default as LabelPartial } from "./partials/label";

export default class Checkbox extends ComponentBase {
    constructor (root, opts, theme) {
        super(root, opts, theme);
        this.styles = styles(theme);

        this.container = ContainerPartial(root, opts.label, theme);
        this.label = LabelPartial(this.container, opts.label, theme);

        this.input = this.container.appendChild(document.createElement("input"));
        this.input.id = "checkbox-" + opts.label + this.uuid;
        this.input.type = "checkbox";
        this.input.checked = opts.initial;
        this.input.className = this.styles["guify-checkbox"];
        // Add ARIA attribute to input based on label text
        if(opts.label) this.input.setAttribute("aria-label", opts.label);

        var label = this.container.appendChild(document.createElement("label"));
        label.htmlFor = this.input.id;

        setTimeout(() => {
            this.emit("initialized", this.input.checked);
        });

        this.input.onchange = (data) => {
            this.emit("input", data.target.checked);
        };

    }

    SetValue(value) {
        this.input.checked = value;
    }

    GetValue() {
        return this.input.checked;
    }

    // From ComponentBase
    SetEnabled(enabled) {
        this.input.disabled = !enabled;
    }
}
