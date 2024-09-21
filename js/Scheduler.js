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
            stepsContainer: document.querySelector(`#${elementId} [data-step-container]`),
            steps: document.querySelectorAll(`#${elementId} [data-step]`),
            model: document.querySelector(`#${elementId} [data-step="model"]`),
            addBtn: document.querySelector(`#${elementId} [data-step-add]`),
        }

        // Events
        this.events = {
            scheduleChange: new Event('schedule-change'),
            scheduleEnd: new Event('schedule-end'),
        }

        this.render();
        this.bindEventListeners();
    }

    render() {
        this.$el.steps.forEach($e => $e.classList.remove('current'));
        this.$el.steps[ super.getState('currentStep') - 1 ]?.classList.add('current');
    }

    bindEventListeners() {
        this.$el.addBtn.addEventListener('click', () => { this.addNewStep() })
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

    addNewStep() {
        const $newStep = this.$el.model.cloneNode(true);
        const $lastStep = this.getLastStep();
        
        // Initial setup
        $newStep.dataset.step = '';
        $newStep.querySelector('[name="time"]').value = $lastStep.querySelector('[name="time"]').value;
        $newStep.querySelector('[name="ppm"]').value = $lastStep.querySelector('[name="ppm"]').value;

        // Insert
        this.$el.stepsContainer.insertBefore($newStep, this.$el.addBtn);

        this.refreshSteps()
    }

    getLastStep() {
        return this.$el.steps[this.$el.steps.length - 2];
    }

    refreshSteps() {
        return this.$el.steps = super.wrapper().querySelectorAll(`[data-step]`);
    }

}