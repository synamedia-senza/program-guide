import { classNames } from "./element.js";

export class Page extends HTMLElement {
    static instance(name) {
        const elements = document.getElementsByTagName(name + "-page");
        return elements[0];
    }

    static get pages() {
        const allElements = document.querySelectorAll('*');
        const pageElements = [];

        allElements.forEach(element => {
            if (element.tagName.toLowerCase().endsWith('-page')) {
                pageElements.push(element);
            }
        });

        return pageElements;
    }

    static get names() {
        let path = window.location.hash.substring(1).split("?")[0];
        if (!path) {
            path = Page.pages[0].name;
        }
        const names = path.split("/");
        return names;
    }

    static get current() {
        const names = Page.names;
        return names[names.length - 1];
    }

    static update() {
        const names = Page.names;
        const current = names[names.length - 1];
        for (const element of Page.pages) {
            element.visible = names.includes(element.name);
            element.focus = current === element.name;
        }
    }

    static back() {
        const [path, query] = window.location.hash.substring(1).split("?");
        const names = path.split("/").slice(0, -1);
        let hash = names.join("/");
        if (query) {
            hash += "?" + query;
        }
        window.location.hash = hash;
    }

    static goto(name) {
        if (name.startsWith("/")) {
            window.location.hash += name;
        }
        else {
            window.location.hash = name;
        }
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.root = this.shadowRoot;
        this.page = this.shadowRoot.host;
        if (!window.location.hash) {
            window.location.hash = this.name;
        }
        const names = Page.names;
        const current = names[names.length - 1];
        const visible = names.includes(this.name);
        this.page.className = classNames({
            page: true,
            visible
        });
        setTimeout(() => {
            this.visible = visible;
            this.focus = current === this.name;
        }, 0);
    }

    get name() {
        return this.shadowRoot.host.tagName.toLowerCase().split("-")[0];
    }

    get visible() {
        return this.page.classList.contains('visible');
    }

    set visible(val) {
        const isVisible = this.visible;
        if (!!isVisible === !!val) {
            return;
        }
        if (val) {
            this.page.classList.add('visible');
            if (this.pageVisible) {
                this.pageVisible();
            }
        }
        else {
            this.page.classList.remove('visible');
            if (this.pageHidden) {
                this.pageHidden();
            }
        }
    }

    get focus() {
        return this.page.classList.contains('focus');
    }

    set focus(val) {
        const isFocused = this.focus;
        if (!!isFocused === !!val) {
            return;
        }
        if (val) {
            this.page.classList.add('focus');
            if (this.pageFocused) {
                this.pageFocused();
            }
            if (this.handleKey) {
                this._keyListener = this.handleKey.bind(this);
                addEventListener("keydown", this._keyListener);
            }
        }
        else {
            this.page.classList.remove('focus');
            if (this.pageBlurred) {
                this.pageBlurred();
            }
            if (this._keyListener) {
                removeEventListener("keydown", this._keyListener);
            }
        }
    }
}

window.addEventListener('hashchange', () => {
    Page.update();
});
