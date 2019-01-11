const Machine = require('../src/machine').Machine;
const State = require('../src/state');
const chai = require('chai');
const isTrue = chai.assert.isTrue;
const isFalse = chai.assert.isFalse;

describe("Machine should ACCEPT ODD NUMBER OF 0'S.", () => {
  let machine;
  before(() => {
    let q0 = new State('q0', { 0: 'q1', 1: 'q0' });
    let q1 = new State('q1', { 0: 'q0', 1: 'q1' });
    q1.makeAcceptable();
    machine = new Machine();
    machine.addState(q0);
    machine.addState(q1);
    machine.initialState('q0');
  });

  beforeEach(() => {
    machine.reset();
  })

  it("0 Should be accepted", () => {
    isTrue(machine.run(['0']));
  });
  it("00 Should be accepted", () => {
    isFalse(machine.run(['0', '0']));
  });
  it("01 Should be accepted", () => {
    isTrue(machine.run(['0', '1']));
  });
  it("010 Should be accepted", () => {
    isFalse(machine.run(['0', '1', '0']));
  });
  it("11 Should be accepted", () => {
    isFalse(machine.run(['1', '1']));
  });

});
