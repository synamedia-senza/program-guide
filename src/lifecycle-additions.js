class lifecycleAdditions {
  constructor() {
    if (lifecycleAdditions.instance) {
      return lifecycleAdditions.instance;
    }
    lifecycleAdditions.instance = this;

    this._autoBackground = false;
    this._autoBackgroundDelay = 30;

    document.addEventListener("keydown", () => {
      if (this.autoBackground) {
        if (senza.lifecycle.state === senza.lifecycle.UiState.BACKGROUND || 
            senza.lifecycle.state === senza.lifecycle.UiState.IN_TRANSITION_TO_BACKGROUND) 
        {
          senza.lifecycle.moveToForeground();
        } else {
          this.startCountdown();
        }
      }
    });
    
    senza.lifecycle.addEventListener("onstatechange", () => {
      if (this._autoBackground && senza.lifecycle.state === senza.lifecycle.UiState.FOREGROUND) {
        this.startCountdown();
      }
    });
  }

  get autoBackground() {
    return this._autoBackground;
  }

  set autoBackground(value) {
    this._autoBackground = value;
    
    console.log("auto-background", value);
    
    if (value) {
      this.startCountdown();
    }
  }

  get autoBackgroundDelay() {
    return this._autoBackgroundDelay;
  }

  set autoBackgroundDelay(value) {
    this._autoBackgroundDelay = value;
    
    if (this.autoBackground) {
      this.startCountdown();
    }
  }
  
  startCountdown() {
    this.stopCountdown();

    console.log("auto-background", "start countdown");
    this.countdown = setTimeout(() => {
      senza.lifecycle.moveToBackground();
    }, this.autoBackgroundDelay * 1000);
  }
  
  stopCountdown() {
    if (this.countdown) {
      clearTimeout(this.countdown);
    }
    this.countdown = null;
  }
}

export default new lifecycleAdditions(); 
