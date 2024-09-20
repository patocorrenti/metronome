class Scheduler {

    constructor( elementId ) {

        this.state = {
            tens: 0,
            seconds: 0,
            mins: 0,
            hrs: 0,
        }

        this.$el = {
            tens: document.querySelector(`#${elementId} #tens`),
            seconds: document.querySelector(`#${elementId} #seconds`),
            mins: document.querySelector(`#${elementId} #mins`),
            hrs: document.querySelector(`#${elementId} #hrs`),
            buttonStart: document.querySelector(`#${elementId} #button-start`),
            buttonStop: document.querySelector(`#${elementId} #button-stop`),
            buttonReset: document.querySelector(`#${elementId} #button-reset`),
        }
        this.Interval;
      
        this.bindEvents();
    }

    bindEvents() {
        this.$el.buttonStart.addEventListener('click', () => {
            clearInterval(this.Interval);
            this.Interval = setInterval( () => { this.count() }, 10 );
        })
        
        this.$el.buttonStop.addEventListener('click', () => {
              clearInterval(this.Interval);
        })
        
        this.$el.buttonReset.addEventListener('click', () => {
            clearInterval(this.Interval);
            this.resetTimer();
        })
    }

    render() {
        this.$el.tens.innerHTML = this.zeroPad(this.state.tens);
        this.$el.seconds.innerHTML = this.zeroPad(this.state.seconds);
        this.$el.mins.innerHTML = this.zeroPad(this.state.mins);
        this.$el.hrs.innerHTML = this.zeroPad(this.state.hrs);
    }

    zeroPad(num) {
        var zero = 2 - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }

    resetTimer() {
        this.state.seconds = 0; 
        this.state.tens = 0;
        this.state.mins = 0;
        this.state.hrs = 0;
        this.render();
    }

    count () {
        this.state.tens++; 
    
        if (this.state.tens > 99) {
            this.state.seconds++;
            this.state.tens = 0;
        }

        if (this.state.seconds > 59) {
            this.state.mins++;
            this.state.seconds = 0;
        }

        if (this.state.mins > 59) {
            this.state.hrs++;
            this.state.mins = 0;
        }
    
        this.render();
    }

}