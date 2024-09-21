class App {

    constructor() {
        this.Metronome = new Metronome('metronome');
        this.Timer = new Timer('timer');
        this.Scheduler = new Scheduler('scheduler');

        this.bindEventListeners();
    }

    bindEventListeners() {
        this.Timer.emmiter().addEventListener('timer-start', () => {
            this.Metronome.eventPlay();
        });
        this.Timer.emmiter().addEventListener('timer-stop', () => {
            this.Metronome.eventStop();
        });
        this.Timer.emmiter().addEventListener('timer-second', (event) => {
            this.Scheduler.updateCurrentTime(
                this.Timer.getCurrentTime()
            );
        });
    }

}