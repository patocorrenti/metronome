class State {

    constructor(initialState) {
        this.state = initialState;
    }

    getState(key) {
        return this.state[key];
    }

    setState(key, value) {
        return this.state[key] = value;
    }

}