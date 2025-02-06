import { classNames, createElement, importStyles } from "../core/ui/element.js";
import { KEY_CODES } from "../core/ui/key.js";
import { Page } from "../core/ui/page.js";
import lifecycleAdditions from "../lifecycle-additions.js";

class VideoPage extends Page {
    constructor() {
        super();
        importStyles(this.shadowRoot, "src/page/video.css");
        this.player = document.getElementById("player");
        this.root = createElement(this.shadowRoot, {
            className: "root"
        });
        this.root.onclick = () => {
            Page.goto("/banner");
        };
        lifecycleAdditions.autoBackgroundDelay = 10;
    }

    async loadAsset(asset) {
        this.asset = asset;
        await this.player.load(asset);
    }

    pageFocused() {
        this.player.play();
        lifecycleAdditions.autoBackground = true;
    }

    pageBlurred() {
        this.player.pause();
        lifecycleAdditions.autoBackground = false;
    }

    handleKey(e) {
        if (e.keyCode === KEY_CODES.BACK) {
            Page.back();
        }
        else if (e.keyCode === KEY_CODES.ENTER) {
            Page.goto("/banner");
        }
    }
}

customElements.define('video-page', VideoPage);
