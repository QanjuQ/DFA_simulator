const State = require('../src/state.js');
const Machine = require('../src/machine.js').Machine;
const isInstanceOfState = require('../src/machine.js').isInstanceOfState;
const chai = require('chai');

describe("Machine", () => {
  describe("transit", () => {
    it("Should return the state when input is present in alphabets", () => {
      let state = new State('q0');
      state.addTransitState(0, 'q1');
      state.addTransitState(1, 'q2');
      let machine = new Machine(state);
      machine.addState(state);
      machine.initialState('q0');
      chai.assert.equal(machine.transit(0), 'q1');
    });
    it("Should throw error when input is not present in alphabets", () => {
      let state = new State('q0');
      state.addTransitState(0, 'q1');
      state.addTransitState(1, 'q2');
      let machine = new Machine();
      machine.addState(new State('q1'));
      machine.initialState('q1');
      chai.expect(() => machine.transit(1)).to.throw(Error);
    });
  });
  describe("addState", () => {
    it("Should add state to machine", () => {
      let state = new State('qa1');
      let machine = new Machine(state);
      machine.addState(state);
      chai.expect(machine.states).to.deep.include(state);
    });
    it("Should not add state when state is not instance of State", () => {
      let machine = new Machine(new State('qa1'));
      const state = "q1";
      machine.addState(state);
      chai.assert.notDeepInclude(machine.states, state);
    });
  });

  describe("isInstanceOfState", () => {
    it("Should return true when given input is instance of State", () => {
      chai.assert.isTrue(isInstanceOfState(new State('qa1')));
    });
    it("Should return false when given input is not instance of State", () => {
      chai.assert.isFalse(isInstanceOfState('qa1'));
    });
  });

  describe("initialState", () => {
    it(`Should assign initial and current state when is one of the states`, () => {
      const state = new State('q0');
      let machine = new Machine();
      machine.addState(state);
      machine.initialState('q0');
      chai.assert.deepEqual(machine._initialState, state.name);
      chai.assert.deepEqual(machine._currentState, state.name);
    });
    it(`Should not add when state is one of the states`, () => {
      let machine = new Machine();
      chai.expect(() => machine.initialState('q0')).to.throw(Error);
      chai.assert.isUndefined(machine._initialState);
      chai.assert.isUndefined(machine._currentState);
    });
  });

  describe("getState", () => {
    it("Should return a state for given name when exists", () => {
      let state = new State('q0');
      let machine = new Machine();
      machine.addState(state);
      chai.expect(machine.getState('q0')).to.deep.equal(state);
    });
    it("Should return undefined for given name when doesn't exist", () => {
      let machine = new Machine();
      chai.assert.isUndefined(machine.getState('q0'));
    });
  });
  describe("run", () => {

  });
});