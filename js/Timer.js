class Timer extends Component {

    constructor( elementId ) {

        super(
            elementId,
            {
                tens: 0,
                seconds: 0,
                mins: 0,
                hrs: 0,
                playing: false,
            }
        );

        // Elements
        this.$el = {
            tens: super.wrapper().querySelector('#tens'),
            seconds: super.wrapper().querySelector('#seconds'),
            mins: super.wrapper().querySelector('#mins'),
            hrs: super.wrapper().querySelector('#hrs'),
            buttonPlay: super.wrapper().querySelector('#button-play'),
            buttonPause: super.wrapper().querySelector('#button-pause'),
            buttonStop: super.wrapper().querySelector('#button-stop'),
        }

        // Events
        this.events = {
            timerPlay: new Event('timer-play'),
            timerPause: new Event('timer-pause'),
            timerStop: new Event('timer-stop'),
            timerSecond: new CustomEvent('timer-second'),
        }

        this.Interval;
        this.render();
        this.bindEventListeners();
    }
    
    bindEventListeners() {
        this.$el.buttonPlay.addEventListener('click', () => {
            clearInterval(this.Interval);
            this.Interval = setInterval( () => { this.count() }, 10 );
            super.setState('playing', true);
            this.render();
            super.emitEvent(this.events.timerPlay);
        })
        
        this.$el.buttonPause.addEventListener('click', () => {
            clearInterval(this.Interval);
            super.setState('playing', false);
            this.render();
            super.emitEvent(this.events.timerPause);
        })
        
        this.$el.buttonStop.addEventListener('click', () => {
            this.resetTimer();
            super.setState('playing', false);
            this.render();
            super.emitEvent(this.events.timerStop);
        })
    }

    render() {
        (super.getState('playing')) ? this.showPause() : this.showPlay();
        this.$el.tens.innerHTML = this.zeroPad(super.getState('tens'));
        this.$el.seconds.innerHTML = this.zeroPad(super.getState('seconds'));
        this.$el.mins.innerHTML = this.zeroPad(super.getState('mins'));
        this.$el.hrs.innerHTML = this.zeroPad(super.getState('hrs'));
    }

    showPlay() {
        this.$el.buttonPlay.style.display = "inline-block";
        this.$el.buttonPause.style.display = "none";
    }

    showPause() {
        this.$el.buttonPause.style.display = "inline-block";
        this.$el.buttonPlay.style.display = "none";
    }

    zeroPad(num) {
        var zero = 2 - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }

    resetTimer() {
        clearInterval(this.Interval);
        super.resetState();
        this.render();
    }

    count () {
        super.increaseState('tens', 1);
    
        if (super.getState('tens') > 99) {
            super.increaseState('seconds', 1);
            super.setState('tens', 0);
            super.emitEvent(this.events.timerSecond);
        }

        if (super.getState('seconds') > 59) {
            super.increaseState('mins', 1);
            super.setState('seconds', 0);
        }

        if (super.getState('mins') > 59) {
            super.increaseState('hrs', 1);
            super.setState('mins', 0);
        }
    
        this.render();
    }

    getCurrentTime() {
        const hrs = this.zeroPad(super.getState('hrs'));
        const mins = this.zeroPad(super.getState('mins'));
        const sec = this.zeroPad(super.getState('seconds'));

        return `${hrs}:${mins}:${sec}`;
    }

}