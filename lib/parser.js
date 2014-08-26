var parser = {
  parse: function(input) {
    var split = input.split(' ');
    return {hostname: split[0], method: split[1], data: JSON.stringify(split[2])};
  }
};

module.exports = parser;
