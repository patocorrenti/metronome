class Timer extends Component {

    constructor( elementId ) {

        super(
            elementId,
            {
                tens: 0,
                seconds: 0,
                mins: 0,
                hrs: 0,
            }
        );

        // Elements
        this.$el = {
            tens: super.wrapper().querySelector('#tens'),
            seconds: super.wrapper().querySelector('#seconds'),
            mins: super.wrapper().querySelector('#mins'),
            hrs: super.wrapper().querySelector('#hrs'),
            buttonStart: super.wrapper().querySelector('#button-start'),
            buttonPause: super.wrapper().querySelector('#button-pause'),
            buttonReset: super.wrapper().querySelector('#button-reset'),
        }

        // Events
        this.events = {
            timerStart: new Event('timer-start'),
            timerPause: new Event('timer-pause'),
            timerReset: new Event('timer-reset'),
            timerSecond: new CustomEvent('timer-second'),
        }

        this.Interval;

        this.bindEventListeners();
    }
    
    bindEventListeners() {
        this.$el.buttonStart.addEventListener('click', () => {
            clearInterval(this.Interval);
            this.Interval = setInterval( () => { this.count() }, 10 );
            super.emitEvent(this.events.timerStart);
        })
        
        this.$el.buttonPause.addEventListener('click', () => {
            clearInterval(this.Interval);
            super.emitEvent(this.events.timerPause);
        })
        
        this.$el.buttonReset.addEventListener('click', () => {
            this.resetTimer();
            super.emitEvent(this.events.timerReset);
        })
    }

    render() {
        this.$el.tens.innerHTML = this.zeroPad(super.getState('tens'));
        this.$el.seconds.innerHTML = this.zeroPad(super.getState('seconds'));
        this.$el.mins.innerHTML = this.zeroPad(super.getState('mins'));
        this.$el.hrs.innerHTML = this.zeroPad(super.getState('hrs'));
    }

    zeroPad(num) {
        var zero = 2 - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }

    resetTimer() {
        clearInterval(this.Interval);
        super.setState('seconds', 0);
        super.setState('tens', 0);
        super.setState('mins', 0);
        super.setState('hrs', 0);
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