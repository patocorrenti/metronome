class Metronome extends Component {

    constructor( elementId ) {
        
        super(
            elementId,
            {
                playing: false,
                interval: {},
                config: {
                    ppm: 120,
                }
            }
        );

        // Elements
        this.$el = {
            PpmInput: super.wrapper().querySelector('#ppm'),
            playBtn: super.wrapper().querySelector('#play-btn'),
            audioSrc: super.wrapper().querySelector('#audio-source'),
        }

        this.render();
        this.bindEventListeners();
    }

    render() {
        this.$el.PpmInput.value = super.getState('config').ppm;
        this.$el.playBtn.classList.toggle('playing', super.getState('playing'));
        return true;
    }

    bindEventListeners() {
        this.$el.playBtn.addEventListener('click', () => { this.eventPlayPause() });
        this.$el.PpmInput.addEventListener('keyup', (event) => { this.changeSpeed(event.target.value) });
    }

    updateMetro() {

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
                this.PPM2Milisec( super.getState('config').ppm )
            );
        }

        super.setState('interval', interval);
        this.render();
    }
        
    PPM2Milisec(ppm) {
        return (60 / ppm) * 1000;
    }

    eventPlayPause() {
        super.toggleState('playing')
        this.updateMetro();
    }

    eventPlay() {
        super.setState('playing', true);
        this.updateMetro();
    }

    eventStop() {
        super.setState('playing', false);
        this.updateMetro();
    }

    changeSpeed(newSpeed) {
        super.setState('config', {ppm: newSpeed});
        this.updateMetro();
    }

    changeConfig(newConfig) {
        super.setState('config', newConfig)
        this.updateMetro();
    }

    disableControls() {
        this.$el.playBtn.disabled = true;
    }

    enableControls() {
        this.$el.playBtn.disabled = false;
    }

}