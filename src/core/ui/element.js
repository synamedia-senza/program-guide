export function createElement(parentElement, props, tagName = "div") {
    const element = document.createElement(tagName);
    if (props) {
        const { dataset, style, ...base } = props;
        Object.assign(element, base);
        if (dataset) {
            for (const key in dataset) {
                element.dataset[key] = dataset[key];
            }
        }
        if (style) {
            Object.assign(element.style, style);
        }
    }
    if (parentElement) {
        parentElement.appendChild(element);
    }
    return element;
}

export function classNames(param) {
    if (typeof param === "object") {
        if (Array.isArray(param)) {
            return param.filter(Boolean).join(" ");
        }
        else {
            return Object.keys(param).filter(key => param[key]).join(" ");
        }
    }
}

export function importStyles(parent, path) {
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = path;
    parent.appendChild(styleLink);
    return styleLink;
}

export function emptyElement(element) {
    if (!element) {
        return;
    }
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

export function getRowAndColumn(element) {
    const rect = element.getBoundingClientRect();
    const rowHeight = element.offsetHeight;
    const columnWidth = element.offsetWidth;

    const row = Math.floor(rect.top / rowHeight) + 1;
    const column = Math.floor(rect.left / columnWidth) + 1;

    return [row, column];
}
