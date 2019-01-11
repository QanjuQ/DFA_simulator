const State = require('../src/state.js');
const Machine = require('../src/machine.js').Machine;
const isInstanceOfState = require('../src/machine.js').isInstanceOfState;
const chai = require('chai');

describe("Machine", () => {
  let machine, state;
  beforeEach(() => {
    machine = new Machine();
    state = new State('q0');
  });
  describe("transit", () => {
    beforeEach(() => {
      state.addTransitState(0, 'q1');
      state.addTransitState(1, 'q2');
      machine.addState(state);
      machine.initialState('q0');
    })
    it("Should return the state when input is present in alphabets", () => {
      chai.assert.equal(machine.transit(0), 'q1');
    });
    it("Should throw error when input is not present in alphabets", () => {
      chai.expect(() => machine.transit(2)).to.throw(Error);
    });
  });
  describe("addState", () => {
    it("Should add state to machine", () => {
      let state = new State('qa1');
      machine.addState(state);
      chai.expect(machine.states).to.deep.include(state);
    });
    it("Should not add state when state is not instance of State", () => {
      const state = "q1";
      machine.addState(state);
      chai.assert.notDeepInclude(machine.states, state);
    });
  });

  describe("isInstanceOfState", () => {
    it("Should return true when given input is instance of State", () => {
      chai.assert.isTrue(isInstanceOfState(state));
    });
    it("Should return false when given input is not instance of State", () => {
      chai.assert.isFalse(isInstanceOfState('qa1'));
    });
  });

  describe("initialState", () => {
    it(`Should assign initial and current state when is one of the states`, () => {
      machine.addState(state);
      machine.initialState('q0');
      chai.assert.deepEqual(machine._initialState, state.name);
      chai.assert.deepEqual(machine._currentState, state.name);
    });
    it(`Should not add when state is one of the states`, () => {
      chai.expect(() => machine.initialState('q0')).to.throw(Error);
      chai.assert.isUndefined(machine._initialState);
      chai.assert.isUndefined(machine._currentState);
    });
  });

  describe("getState", () => {
    it("Should return a state for given name when exists", () => {
      machine.addState(state);
      chai.expect(machine.getState('q0')).to.deep.equal(state);
    });
    it("Should return undefined for given name when doesn't exist", () => {
      chai.assert.isUndefined(machine.getState('q0'));
    });
  });
  describe("run", () => {
    beforeEach(() => {
      let q0 = new State('q0');
      q0.addTransitState(0, 'q0');
      q0.addTransitState(1, 'q1');
      q0.makeAcceptable();
      let q1 = new State('q1');
      q1.addTransitState(0, 'q1');
      q1.addTransitState(1, 'q1');
      machine.addState(q0);
      machine.addState(q1);
      machine.initialState('q0');
    });

    it("Should return true when input is accepted", () => {
      chai.assert.isTrue(machine.run(['0', '0', '0', '0']));
    });

    it("Should return false when input is rejected", () => {
      chai.assert.isFalse(machine.run(['1', '0', '0', '0']));
    });
  });
});
