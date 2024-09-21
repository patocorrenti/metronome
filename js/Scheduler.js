class Scheduler extends Component {
 
    constructor(elementId) {
        super(
            elementId,
            {
                currentStep: 0,
                currentTime: '00:00:00',
                metronomeConfig: {}, 
            }
        );

        // Elements
        this.$el = {
            steps: document.querySelectorAll(`#${elementId} [data-step]`),
        }

        // Events
        this.events = {
            scheduleChange: new Event('schedule-change'),
            scheduleEnd: new Event('schedule-end'),
        }

        this.render();
    }

    render() {
        this.$el.steps.forEach($e => $e.classList.remove('current'));
        this.$el.steps[ super.getState('currentStep') - 1 ]?.classList.add('current');
    }

    updateCurrentTime(time) {
        super.setState('currentTime', time);
        this.updateScheduler();
    }

    updateScheduler() {
        const currentTime = super.getState('currentTime');
        const currentStep = super.getState('currentStep');
        const time2Compare = this.getStepValue(currentStep, 'time');

        if( currentTime === time2Compare ) {
            
            if( !this.nextStep() ) {
                super.emitEvent(this.events.scheduleEnd);
                return false;
            }

            super.setState('metronomeConfig', {
                ppm: this.getStepValue(currentStep, 'ppm'),
            })
            this.render();
            super.emitEvent(this.events.scheduleChange);
        }
    }

    getStepValue(step, key) {
        return this.$el.steps[step].querySelector(`[name="${key}"]`).value;
    }

    nextStep() {
        const nextStep = super.getState('currentStep') + 1;
        return !!this.$el.steps[nextStep]
            ? super.setState('currentStep', nextStep)
            : false;
    }

    reset() {
        super.resetState();
        this.render();
    }

}