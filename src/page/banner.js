import { createElement, emptyElement, importStyles } from "../core/ui/element.js";
import { KEY_CODES } from "../core/ui/key.js";
import { Page } from "../core/ui/page.js";

class BannerPage extends Page {
    constructor() {
        super();
        importStyles(this.shadowRoot, "src/page/banner.css");
        this.background = createElement(this.root, {
            className: "background"
        });
        this.background.onclick = () => {
            Page.back();
        };
        this.content = createElement(this.root, {
            className: "content"
        });
        this.titleElement = createElement(this.root, {
            className: "title"
        });
        this.update();
    }

    formatDuration(duration, includeHours = false) {
        if (isNaN(duration) || duration <= 0) {
            return "00:00:00";
        }
        const seconds = Math.floor(duration % 60);
        const minutes = Math.floor(duration / 60 % 60);
        const hours = Math.floor(duration / (60 * 60) % 24);

        const hoursString = hours || includeHours ? (hours < 10 ? "0" + hours : hours) + ":" : "";
        const minutesString = minutes < 10 ? "0" + minutes : minutes;
        const secondsString = seconds < 10 ? "0" + seconds : seconds;

        return hoursString + minutesString + ":" + secondsString;
    }

    update() {
        const videoPage = Page.instance("video");
        const player = document.getElementById("player");
        const asset = videoPage.asset;
        emptyElement(this.content);
        this.titleElement.innerText = asset?.title || "Unknown";
        this.container = createElement(this.content, {
            className: "container"
        });
        this.seekContainer = createElement(this.container, {
            className: "seekContainer"
        });
        this.seekTime = createElement(this.seekContainer, {
            className: "time",
            textContent: this.formatDuration(player.currentTime, true)
        });
        this.seekBar = createElement(this.seekContainer, {
            className: "bar"
        });
        createElement(this.seekContainer, {
            className: "time",
            textContent: this.formatDuration(player.duration, true)
        });
        const position = asset?.live ? player.currentTime - new Date(asset?.startDateTime).getTime() / 1000 : player.currentTime;
        const width = position * 100 / (asset?.duration || player.duration);
        this.seekPos = createElement(this.seekBar, {
            className: "pos",
            style: {
                width: width + "%"
            }
        });
    }

    pageFocused() {
        this.update();
    }

    handleKey(e) {
        const player = document.getElementById("player");
        if (e.keyCode === KEY_CODES.BACK) {
            Page.back();
        }
        else if (e.keyCode === KEY_CODES.LEFT) {
            if (player.currentTime <= 30) {
                player.currentTime = 0;
            } else {
                player.currentTime = (Math.round(player.currentTime / 30) * 30) - 30;
            }
            this.update();
        } else if (e.keyCode === KEY_CODES.RIGHT) {
            if (player.currentTime > player.duration + 30) {
                player.currentTime = player.duration;
            }
            else {
                player.currentTime = (Math.round(player.currentTime / 30) * 30) + 30;
            }
            this.update();
        }
    }
}

customElements.define('banner-page', BannerPage);
