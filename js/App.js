class App {

    constructor() {
        this.Metronome = new Metronome('metronome');
        this.Scheduler = new Scheduler('scheduler');

        this.bindEventListeners();
    }

    bindEventListeners() {
        this.Scheduler.emmiter().addEventListener('timer-start', () => {
            this.Metronome.eventPlayPause()
        })
        this.Scheduler.emmiter().addEventListener('timer-stop', () => {
            this.Metronome.eventPlayPause()
        })
    }

}