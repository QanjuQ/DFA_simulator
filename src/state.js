class State {
  constructor (name, transits = {}, acceptable = false) {
    this._transitStates = transits;
    this.name = name;
    this._isAcceptable = acceptable;
  }

  transitStates(transitStates) {
    this._transitStates = transitStates;
  }

  transitionExists(alphabet) {
    return Object.keys(this._transitStates).includes(`${alphabet}`);
  }

  transit(input) {
    if (this.transitionExists(input)) {
      return this._transitStates[`${input}`];
    }
    throw new Error("Invalid input");
  }

  addTransitState(alphabet, stateName) {
    return this._transitStates[alphabet] = stateName;
  }

  totalNumberOfTransits() {
    return Object.keys(this._transitStates).length;
  }

  makeAcceptable() {
    return this._isAcceptable = true;
  }

  isAcceptable() {
    return this._isAcceptable;
  }
}

module.exports = State;