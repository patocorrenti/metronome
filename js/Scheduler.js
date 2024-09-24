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
            stepsContainer: super.wrapper().querySelector('[data-step-container]'),
            steps: super.wrapper().querySelectorAll('[data-step]'),
            model: super.wrapper().querySelector('[data-step="model"]'),
            addBtn: super.wrapper().querySelector('[data-step-add]'),
            removeBtns: super.wrapper().querySelectorAll('[data-step-remove]'),
        }

        // Events
        this.events = {
            scheduleChange: new Event('schedule-change'),
            scheduleEnd: new Event('schedule-end'),
        }

        this.$el.model.remove();
        this.refreshSteps();
        this.render();
        this.bindEventListeners();
    }

    render() {
        const currentStep = super.getState('currentStep');
        this.$el.steps.forEach($e => $e.classList.remove('current', 'played'));
        this.$el.steps[ currentStep - 1 ]?.classList.add('current');
        for(let i=0; i<currentStep-1; i++) {
            this.$el.steps[i]?.classList.add('played');
        }
    }

    bindEventListeners() {
        this.$el.addBtn.addEventListener('click', () => { this.addNewStep() })
        this.$el.removeBtns.forEach(
            $b => $b.addEventListener('click', (event) => { this.removeStep(event) })
        );
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
        const $btnRemove = $newStep.querySelector('[data-step-remove]');
        const $lastStep = this.getLastStep();
        
        // Initial setup
        $newStep.dataset.step = '';
        $btnRemove.disabled = false;
        $btnRemove.addEventListener('click', (event) => this.removeStep(event));
        $newStep.querySelector('[name="time"]').value = $lastStep.querySelector('[name="time"]').value;
        $newStep.querySelector('[name="ppm"]').value = $lastStep.querySelector('[name="ppm"]').value;

        // Insert
        this.$el.stepsContainer.insertBefore($newStep, this.$el.addBtn);

        this.refreshSteps()
        return true;
    }

    getLastStep() {
        return this.$el.steps[this.$el.steps.length - 2];
    }

    refreshSteps() {
        this.$el.removeBtns = super.wrapper().querySelectorAll('[data-step-remove]');
        this.$el.steps = super.wrapper().querySelectorAll(`[data-step]`);
        return true;
    }

    removeStep(event) {
        event.target.closest('[data-step]').remove();
        this.refreshSteps();
        return true;
    }

}