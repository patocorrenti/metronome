class App {

    constructor() {
        this.Metronome = new Metronome('metronome');
        this.Scheduler = new Scheduler('scheduler');

        this.bindEventListeners();
    }

    bindEventListeners() {
        this.Scheduler.emmiter().addEventListener('timer-start', () => {
            this.Metronome.eventPlay()
        })
        this.Scheduler.emmiter().addEventListener('timer-stop', () => {
            this.Metronome.eventStop()
        })
    }

}