export const KEY_CODES = {
    BACK: 27,
    HOME: 36,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    ENTER: 13
};

export function getKeyId(keyCode) {
    return Object.entries(KEY_CODES).find(([, val]) => val === keyCode)?.[0] || String(keyCode);
}
