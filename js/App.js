class App {

    constructor() {
        this.Metronome = new Metronome('metronome');
        this.Timer = new Timer('timer');

        this.bindEventListeners();
    }

    bindEventListeners() {
        this.Timer.emmiter().addEventListener('timer-start', () => {
            this.Metronome.eventPlay()
        })
        this.Timer.emmiter().addEventListener('timer-stop', () => {
            this.Metronome.eventStop()
        })
    }

}