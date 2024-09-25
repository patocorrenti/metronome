class App {

    constructor() {
        this.Metronome = new Metronome('metronome');
        this.Timer = new Timer('timer');
        this.Scheduler = new Scheduler('scheduler');

        this.bindEventListeners();
    }

    bindEventListeners() {
        this.Timer.emmiter().addEventListener('timer-play', () => {
            this.Metronome.eventPlay();
            this.Metronome.disableControls();
            this.Scheduler.playMode(true);
            this.updateScheduler();
        });
        this.Timer.emmiter().addEventListener('timer-pause', () => {
            this.Metronome.enableControls();
            this.Metronome.eventStop();
            this.Scheduler.playMode(false);
        });
        this.Timer.emmiter().addEventListener('timer-stop', () => {
            this.stopAndReset()
            this.Metronome.enableControls();
        });
        this.Timer.emmiter().addEventListener('timer-second', () => {
            this.updateScheduler();
        });
        this.Scheduler.emmiter().addEventListener('schedule-change', () => {
            this.Metronome.changeConfig( this.Scheduler.getState('metronomeConfig') );
        }) 
        this.Scheduler.emmiter().addEventListener('schedule-end', () => {
            this.stopAndReset()
        });
    }

    updateScheduler() {
        this.Scheduler.updateCurrentTime(
            this.Timer.getCurrentTime()
        );
    }

    stopAndReset() {
        this.Metronome.enableControls();
        this.Metronome.eventStop();
        this.Scheduler.reset();
        this.Timer.resetTimer();
        this.Scheduler.playMode(false);
    }

}