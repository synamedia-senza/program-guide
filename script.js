await senza.init();

import "./src/widgets/player.js";

import "./src/page/main.js";
import "./src/page/video.js";
import "./src/page/banner.js";

window.addEventListener('load', function () {
    senza.lifecycle.configure({
        autoBackground: {enabled: true, timeout: {playing: 15, idle: 15}},
        autoSuspend: {enabled: false},
    });

    senza.uiReady();
});
