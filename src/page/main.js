import { createElement, emptyElement, importStyles } from "../core/ui/element.js";
import Navigator from "../core/ui/navigator.js";
import { Page } from "../core/ui/page.js";
import epgData from "../data.js";

import "../widgets/swimlane.js";

class MainPage extends Page {
    constructor() {
        super();
        importStyles(this.shadowRoot, "src/page/main.css");
        this.page.style.background = "linear-gradient(to right, #222, #333)";
        this.swimlanes = createElement(this.root, { className: "swimlanes" });
        this.navigator = new Navigator();
        this.populate(epgData);
    }

    gotoAsset(asset) {
        const videoPage = Page.instance("video");
        videoPage.loadAsset(asset);

        Page.goto("video");
    }

    populate(swimlanes) {
        emptyElement(this.swimlanes);
        for (const swimlane of swimlanes) {
            const swimlaneElement = createElement(this.swimlanes, {}, "swimlane-widget");

            swimlaneElement.title = swimlane.name;
            swimlaneElement.populate(swimlane.assets, this.gotoAsset.bind(this), {
                ...swimlane,
                navigator: this.navigator
            });
        }
    }

    handleKey(e) {
        this.navigator.handleNavigation(e);
    }

    pageFocused() {
        this.navigator.restoreFocus();
    }
}

customElements.define('main-page', MainPage);
