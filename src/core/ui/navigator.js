import { KEY_CODES } from "./key.js";

export default class Navigator {
    constructor() {
        this.elements = [];
        this.selected = null;
    }

    register(element) {
        const exists = this.elements.find(el => el === element);
        if (exists) {
            return;
        }
        this.elements.push(element);
        const onSelected = () => {
            this.selected = element;
        };
        const onUnregister = () => {
            element.removeEventListener("unregister", onUnregister);
            element.removeEventListener("selected", onSelected);
            this.elements = this.elements.filter(el => el !== element);
        };
        element.addEventListener("selected", onSelected);
    }

    getAdjacentElement(currentElement, keyCode) {
        if (!this.elements || this.elements.length === 0 || !currentElement) {
            return null;
        }

        // Get the bounding box of the current element
        const currentRect = currentElement.getBoundingClientRect();

        // Define proximity threshold to consider elements as neighbors
        const proximityThreshold = 5;

        // Calculate distance and potential neighbors
        let closestElement = null;
        let closestDistance = Infinity;

        this.elements.forEach((element) => {
            if (element === currentElement) return;

            const rect = element.getBoundingClientRect();

            // Calculate distance and check region
            let isValidNeighbor = false;
            let distance = Infinity;

            switch (keyCode) {
                case KEY_CODES.UP:
                    if (
                        rect.bottom <= currentRect.top - proximityThreshold && // Element is above
                        rect.right >= currentRect.left - proximityThreshold && // Overlapping horizontally
                        rect.left <= currentRect.right + proximityThreshold
                    ) {
                        isValidNeighbor = true;
                        distance = Math.abs(rect.bottom - currentRect.top);
                    }
                    break;
                case KEY_CODES.DOWN:
                    if (
                        rect.top >= currentRect.bottom + proximityThreshold && // Element is below
                        rect.right >= currentRect.left - proximityThreshold && // Overlapping horizontally
                        rect.left <= currentRect.right + proximityThreshold
                    ) {
                        isValidNeighbor = true;
                        distance = Math.abs(rect.top - currentRect.bottom);
                    }
                    break;
                case KEY_CODES.LEFT:
                    if (
                        rect.right <= currentRect.left - proximityThreshold && // Element is to the left
                        rect.bottom >= currentRect.top - proximityThreshold && // Overlapping vertically
                        rect.top <= currentRect.bottom + proximityThreshold
                    ) {
                        isValidNeighbor = true;
                        distance = Math.abs(rect.right - currentRect.left);
                    }
                    break;
                case KEY_CODES.RIGHT:
                    if (
                        rect.left >= currentRect.right + proximityThreshold && // Element is to the right
                        rect.bottom >= currentRect.top - proximityThreshold && // Overlapping vertically
                        rect.top <= currentRect.bottom + proximityThreshold
                    ) {
                        isValidNeighbor = true;
                        distance = Math.abs(rect.left - currentRect.right);
                    }
                    break;
            }

            // Check if this neighbor is closer than the current closest
            if (isValidNeighbor && distance < closestDistance) {
                closestDistance = distance;
                closestElement = element;
            }
        });

        return closestElement;
    }

    handleNavigation(e) {
        switch (e.keyCode) {
            case KEY_CODES.RIGHT:
            case KEY_CODES.LEFT:
            case KEY_CODES.DOWN:
            case KEY_CODES.UP:
                const adjacentElement = this.getAdjacentElement(this.selected, e.keyCode);
                if (adjacentElement) {
                    this.selected.dispatchEvent(new Event("unselected"));
                    this.selected = adjacentElement;
                    this.update();
                }
                break;
            case KEY_CODES.ENTER:
                const focused = this.selected;
                if (focused) {
                    focused.onclick();
                }
                break;
        }
    }

    restoreFocus() {
        this.update();
    }

    update() {
        const selected = this.selected;
        if (!selected) {
            this.selected = this.elements[0];
        }
        if (this.selected) {
            this.selected.dispatchEvent(new Event("selected"));
        }
    }
}
