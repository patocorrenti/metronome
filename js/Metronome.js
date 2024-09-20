class Metronome extends State {

    constructor( elementId ) {

        // Initial state
        super({
            playing: false,
            ppm: 120,
            interval: {}
        })

        // Container element
        this.element = document.getElementById(elementId);

        if( !this.element ) {
            alert('Failed!');
            return;
        }

        // Elements
        this.$el = {
            PpmInput: document.querySelector(`#${elementId} #ppm`),
            playBtn: document.querySelector(`#${elementId} #play-btn`),
            audioSrc: document.querySelector(`#${elementId} #audio-source`),
        }

        this.render();
        this.bindEvents();
    }

    render() {
        this.$el.PpmInput.value = super.getState('ppm');
        this.$el.playBtn.classList.toggle('playing', super.getState('playing'));
        return true;
    }

    bindEvents() {
        this.$el.playBtn.addEventListener('click', () => { this.eventPlayPause() });
        this.$el.PpmInput.addEventListener('keyup', (event) => { this.changeSpeed(event.target.value) });
    }

    playPause() {
        let interval = {};
        
        // Stop the interval
        clearInterval( super.getState('interval') );

        // Starts a new interval
        if (super.getState('playing')) {
            interval = setInterval(
                () => {
                    // Reproduces the audio
                    this.$el.audioSrc.play();
                },
                this.PPM2Milisec( super.getState('ppm') )
            );
        }

        super.setState('interval', interval);
    }

    PPM2Milisec(ppm) {
        return (60 / ppm) * 1000;
    }

    eventPlayPause() {
        super.setState('playing', !super.getState('playing'));
        this.playPause();
        this.render();
    }

    changeSpeed(newSpeed) {
        super.setState('ppm', newSpeed);
        this.playPause();
        this.render();
    }


}