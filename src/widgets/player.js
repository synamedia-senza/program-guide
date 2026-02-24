import { createElement, importStyles } from "../core/ui/element.js";
import { client } from "../messages/client.js";

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
            this.loaded = true;
            if (this.playMode) {
                console.log("[program-guide] PlayerWidget play (from canplay)");
                this.video.play();
            }
        });

        console.log("client", client);
        client.onMessageArrived = this.gotMessage.bind(this); // JavaScript is weird
        client.connect().then(() => {
          client.subscribe(config.topic);
        });
        this.sender = getRandomIntInclusive(1, 10000);
    }

    configure() {
        const shakaConfig = {
            // manifest: {
            //     defaultPresentationDelay: 32,
            //     dash: {
            //         ignoreSuggestedPresentationDelay: true
            //     }
            // },
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

    async load(asset) {
        this.asset = asset;
        console.log("[program-guide] PlayerWidget load " + this.asset.source);
        this.configure();
        await this.player.load(this.asset.source);
        this.video.currentTime = 0;
        
        this.sendMessage("load", this.asset.source);
    }

    syncAsset(source) {
      try {
        if (this.player.getAssetUri() != source) {
          console.log("switching to", source);
          this.load({source});
        } else {
          console.log("already playing", source);
        }
      } catch (error) {
        console.error("conditionalLoad", error)
      }
    }

    get currentTime() {
        return this.video.currentTime;
    }

    get duration() {
        return this.video.duration;
    }

    set currentTime(time) {
        this.video.currentTime = time;
        this.sendMessage("currentTime", time);
    }

    syncCurrentTime(time) {
      if (Math.abs(this.video.currentTime - time) > 2) {
        this.video.currentTime = time;
      }
    }

    get paused() {
        return this.video.paused;
    }

    play(userInput = true) {
        this.playMode = true;
        console.log("[program-guide] PlayerWidget play", userInput);
        this.video.play();
        if (userInput) this.sendMessage("paused", false);
    }

    pause(userInput = true) {
        this.playMode = false;
        console.log("[program-guide] PlayerWidget pause", userInput);
        this.video.pause();
        if (userInput) this.sendMessage("paused", true);
    }
    
    async syncPaused(value) {
      if (this.paused != value) {
        if (value) {
          await this.pause(false)
        } else {
          await this.play(false);
        }
      }
    }
    
    sendMessage(event, message) {
      let body = {sender: this.sender, event, message};
      client.publish(config.topic, body);
    }
    
    async gotMessage(message) {
      try {
        let info = JSON.parse(message.payloadString);
        console.log("gotMessage", info);
        if (info.sender != this.sender) {
          switch (info.event) {
            case "load": this.syncAsset(info.message); break;
            case "paused": await this.syncPaused(info.message); break;
            case "currentTime": this.syncCurrentTime(info.message); break;
          }
        }
      } catch (error) {
        console.error("couldn't parse message", error);
      }
    }
}

customElements.define('player-widget', PlayerWidget);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
