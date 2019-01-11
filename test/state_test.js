const chai = require('chai');
const State = require('../src/state.js');

describe("State", () => {

  describe("transit", () => {
    it("Should return new state when given alphabet is present", () => {
      let state = new State('q2');
      state.addTransitState(1, 'q1');
      state.addTransitState(0, 'q0');
      chai.expect(state.transit(1)).to.equal('q1');
    });
    it("Should throw error when given alphabet is not present", () => {
      let state = new State('q2');
      chai.expect(() => state.transit(1)).to.throw(Error);
    });
  });

  describe("isAcceptable", () => {
    it("Should return false when state is not acceptable", () => {
      let state = new State('q2');
      chai.assert.isFalse(state.isAcceptable());
    });
    it("Should return true when state is not acceptable", () => {
      let state = new State('q2');
      state.makeAcceptable();
      chai.assert.isTrue(state.isAcceptable());
    });
  });

  describe("makeAcceptable", () => {
    it("Should make the state final", () => {
      let state = new State('q1');
      chai.assert.isFalse(state.isAcceptable());
      state.makeAcceptable();
      chai.assert.isTrue(state.isAcceptable());
    });
  });

  describe("totalNumberOfTransits", () => {
    it("Should return the total number of out", () => {
      let state = new State('q1');
      chai.expect(state.totalNumberOfTransits()).equals(0);
    });
  });

  describe("transitionExists", () => {
    it("Should return true when a transition exists for given alphabet", () => {
      let state = new State('q1');
      state.addTransitState('1', 'q1');
      chai.assert.isTrue(state.transitionExists(1));
    });
    it("Should return false when a transition doesn't exist for given alphabet", () => {
      let state = new State('q1');
      chai.assert.isFalse(state.transitionExists(1));
    });
  });

  describe("transitStates", () => {
    it("Should add the transit states object into state", () => {
      let state = new State('q1');
      let transitStates = { 1: 'q1', 2: 'q2' };
      state.transitStates(transitStates);
      chai.expect(state._transitStates).deep.equal(transitStates);
      chai.expect(state.transit(1)).to.equal('q1');
      chai.expect(state.transit(2)).to.equal('q2');
    });
    it("Should add the transit state for given alphabet", () => {
      let state = new State('q1');
      state.addTransitState(1, 'q1');
      chai.expect(state._transitStates).deep.equal({ 1: 'q1' });
      chai.expect(state.transit(1)).to.equal('q1');
    });
  })
});