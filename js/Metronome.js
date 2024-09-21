class Metronome extends Component {

    constructor( elementId ) {
        
        super(
            elementId,
            {
                playing: false,
                ppm: 120,
                interval: {}
            }
        );
        
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
        this.bindEventListeners();
    }

    render() {
        this.$el.PpmInput.value = super.getState('ppm');
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
                this.PPM2Milisec( super.getState('ppm') )
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
        super.setState('ppm', newSpeed);
        this.updateMetro();
    }


}