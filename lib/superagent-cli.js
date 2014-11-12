var sa = require('superagent');

var sacli = function(input, callback) {
  var req = sa(input.method.toUpperCase(), input.hostname);
  if (input.user && input.password) {
    req.auth(input.user, input.password);
  }
  req.send(input.data);
  req.timeout(input.timeout || 3000);
  req.end(callback);
};

module.exports = sacli;
