const State = require('./state.js');
const isInstanceOfState = (state) => (state instanceof State);

class Machine {
  constructor () {
    this.states = [];
    this._initialState = undefined;
    this._currentState = undefined;
  }

  initialState(state) {
    if (this.getState(state) == undefined) {
      throw new Error("State does not exist.");
    }
    this._initialState = this.getState(state).name;
    this._currentState = this._initialState;
  }

  transit(input) {
    const currentState = this.getState(this._currentState);
    return this._currentState = currentState.transit(input);
  }

  addState(state) {
    if (isInstanceOfState(state)) {
      this.states.push(state);
    }
  }

  getState(name) {
    return this.states.filter((state) => (state.name == name))[0];
  }

  run(input) {
    `${input}`.split('').forEach(this.transit.bind(this));
    return this.getState(this._currentState).isAcceptable();
  }
}

module.exports = {
  Machine,
  isInstanceOfState
};