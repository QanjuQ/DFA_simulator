const read = require('readline-sync').question;
const parser = require('./parse');
const State = require('./src/state');
const Machine = require('./src/machine').Machine;

const readInput = () => {
  let alphabets = read("Enter the machine alphabets\n");
  alphabets = parser.parse(alphabets);
  console.log("Enter input with space character as delimiter.");
  let states = read("Enter the states your DFA has\n").split(' ');
  let acceptableStates = read("Enter the acceptable states your DFA has.\n").split(' ');
  let initialState = read("Enter the initial state in your DFA.\n");
  return {
    alphabets, states, acceptableStates, initialState
  }
};

const validate = (input) => {
  return input.states.includes(input.initialState) &&
    input.acceptableStates.every(input.states.includes);
}

const readStates = (states, isAcceptable) => {
  return states.map((state) => {
    console.log("{alphabet}:{state},{alphabet}:{state}");
    let transits = read(`Enter the alphabets and transit states for ${state}\n`);
    transits = parser.parseTransits(transits);
    return new State(state, transits, isAcceptable(state));
  });
};

const createMachine = (states, initialState) => {
  let machine = new Machine();
  states.forEach(machine.addState.bind(machine));
  machine.initialState(initialState);
  return machine;
};

const isAcceptable = (acceptableStates) =>
  (state) => (acceptableStates.includes(state));

const setup = () => {
  let input = readInput();
  // if (validate(input)) return; //do something
  let states = readStates(input.states, isAcceptable(input.acceptableStates));
  let machine = createMachine(states, input.initialState);
  return machine;
};

const main = () => {
  let machine = setup();
  while (true) {
    machine.reset();
    let input = read("Enter the string to test:  ");
    let result = machine.run(input.split(''));
    let output = { true: "accepted", false: "rejected" };
    console.log(`${input} got ${output[result]}`);
  }
};

main(); 