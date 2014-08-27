var sa = require('superagent');

var sacli = function(input, callback) {
  var req = sa(input.method.toUpperCase(), input.hostname);
  req.send(input.data);
  req.end(callback);
};

module.exports = sacli;
