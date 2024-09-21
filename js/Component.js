class Component {

    constructor(elementId, initialState={}) {
        this.$wrapper = document.getElementById(elementId);
        this.initialState = JSON.parse(JSON.stringify(initialState));
        this.state = initialState;
    }

    emmiter() {
        return this.$wrapper;
    }

    emitEvent(event) {
        return this.$wrapper.dispatchEvent(event);
    }

    getState(key) {
        return this.state[key];
    }

    setState(key, value) {
        return this.state[key] = value;
    }

    increaseState(key, value) {
        return this.state[key] += value;
    }

    toggleState(key) {
        return this.state[key] = !this.state[key];
    }

    resetState() {
        this.state = JSON.parse(JSON.stringify(this.initialState));
    }

}