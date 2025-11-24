import { classNames, createElement, importStyles } from "../core/ui/element.js";
import { KEY_CODES } from "../core/ui/key.js";
import { Page } from "../core/ui/page.js";

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
    }

    async loadAsset(asset) {
        this.asset = asset;
        await this.player.load(asset);
    }

    pageFocused() {
        this.player.play();
    }

    pageBlurred() {
        this.player.pause();
    }

    handleKey(e) {
        if (e.keyCode === KEY_CODES.BACK) {
            Page.back();
            setTimeout(() => this.player.unload(), 100);
        }
        else if (e.keyCode === KEY_CODES.ENTER) {
            Page.goto("/banner");
        }
    }
}

customElements.define('video-page', VideoPage);
