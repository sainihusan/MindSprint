export class Timer {

    //initialize the timer
  constructor(displayEl, duration, onTimeUp) {
    this.displayEl = displayEl;
    this.duration = duration;
    this.remaining = duration;
    this.onTimeUp = onTimeUp;
    this.interval = null;
  }

  //start the timer
  start() {
    this.displayEl.textContent = ` Time left: ${this.remaining}s`;
    this.interval = setInterval(() => {
      this.remaining--;
      this.displayEl.textContent = ` Time left: ${this.remaining}s`;

      if (this.remaining <= 0) {
        clearInterval(this.interval);
        this.onTimeUp();
      }
    }, 1000);
  }
  //stop the timer
  stop() {
    clearInterval(this.interval);
  }
   //reset the timer
  reset() {
    this.remaining = this.duration;
    clearInterval(this.interval);
  }
  //get the time taken
  getTimeTaken() {
    return this.duration - this.remaining;
  }
}
