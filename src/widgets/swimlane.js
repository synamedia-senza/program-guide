import { classNames, createElement, importStyles } from "../core/ui/element.js";

export class SwimlaneWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        importStyles(this.shadowRoot, "src/widgets/swimlane.css");
        this.root = createElement(this.shadowRoot, {
            className: classNames({
                swimlane: true
            })
        });

        this.titleElement = createElement(this.root, { className: "title" });

        this.assetsElement = createElement(this.root, { className: "assets" });
    }

    get title() {
        return this.titleElement.textContent;
    }

    set title(text) {
        this.titleElement.textContent = text;
    }

    clear() {
        for (const child of this.assetsElement.children) {
            child.dispatchEvent(new Event("unregister"));
            this.assetsElement.removeChild(child);
        }
    }

    populate(assets, gotoAsset, options) {
        const orientation = options?.orientation || "landscape";
        this.clear();
        for (const asset of assets) {
            const assetElement = createElement(this.assetsElement, {
                className: classNames({ asset: true, [orientation]: true })
            });

            if (options.navigator) {
                options.navigator.register(assetElement);
            }

            const posterElement = createElement(assetElement, {
                className: classNames({
                    poster: true,
                    [orientation]: true
                })
            }, asset.poster && "img");
            if (asset.poster) {
                posterElement.src = asset.poster;
            }
            else {
                posterElement.style.background = asset.background;
            }

            const labelElement = createElement(assetElement, {
                className: "label"
            });
            labelElement.textContent = asset.title;

            assetElement.onclick = () => {
                gotoAsset(asset);
            };

            assetElement.addEventListener("selected", () => {
                assetElement.classList.add("focus");
                posterElement.classList.add("focus");
                labelElement.classList.add("focus");
                this.root.scrollIntoView({ behavior: "smooth" });
            });

            assetElement.addEventListener("unselected", () => {
                assetElement.classList.remove("focus");
                posterElement.classList.remove("focus");
                labelElement.classList.remove("focus");
            });
        }
    }
}

customElements.define('swimlane-widget', SwimlaneWidget);
