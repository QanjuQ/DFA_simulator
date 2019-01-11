const isNotSpace = (element) => {
  return element !== ' ';
};

const parse = (alphabets) =>
  (alphabets.split('').filter(isNotSpace));

const parseTransits = (inputTransits) => {
  let transits = {};
  inputTransits.split(',').forEach(
    transit => {
      transit = transit.split(':');
      transits[transit[0]] = transit[1];
    });
  return transits;
};

module.exports = {
  parse, parseTransits
};