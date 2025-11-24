import { createElement, importStyles } from "../core/ui/element.js";
import analytics from "../analytics.js"

export class PlayerWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        importStyles(this.shadowRoot, "src/widgets/player.css");
        this.video = createElement(this.shadowRoot, {
            className: "root"
        }, "video");
        this.player = new senza.ShakaPlayer();
        this.player.attach(this.video);
        this.playMode = false;
        this.video.addEventListener('canplay', () => {
            if (this.playMode) {
                this.video.play();
            }
        });
        
        this.initAnalytics();
    }

    configure() {
        const shakaConfig = {
            manifest: {
                defaultPresentationDelay: 32,
                dash: {
                    ignoreSuggestedPresentationDelay: true
                }
            },
            drm: {
                servers: {
                    'com.widevine.alpha': this.asset.license
                },
                advanced: {
                    'com.widevine.alpha': {
                        'videoRobustness': 'SW_SECURE_CRYPTO',
                        'audioRobustness': 'SW_SECURE_CRYPTO'
                    }
                }
            }
        };

        if (!this.player?.configure(shakaConfig)) {
            console.error("Shaka configure failed!", shakaConfig);
        }
    }

    async initAnalytics() {
      const config = await this.loadAnalyticsConfig();
      await analytics.init("Program Guide", {
        google: {gtag: config.googleAnalyticsId, debug: true},
        ipdata: {apikey: config.ipDataAPIKey},
        lifecycle: {raw: false, summary: true},
        player: {raw: false, summary: true}
      });
      analytics.trackPlayerEvents(this.player, this.video, (ctx) => this.asset);
    }

    async loadAnalyticsConfig(url = "./src/config.json") {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return {};
        return await res.json();
      } catch {
        console.warn("Analytics config.json not found");
        return {};
      }
    }
    
    async load(asset) {
        this.asset = asset;
        this.configure();
        await this.player.load(this.asset.source);
        this.video.currentTime = 0;
    }

    unload() {
      this.player.unload();
    }

    get currentTime() {
        return this.video.currentTime;
    }

    get duration() {
        return this.video.duration;
    }

    set currentTime(time) {
        this.video.currentTime = time;
    }

    get paused() {
        return this.video.paused;
    }

    play() {
        this.playMode = true;
        this.video.play();
    }

    pause() {
        this.playMode = false;
        this.video.pause();
    }
    
}

customElements.define('player-widget', PlayerWidget);
