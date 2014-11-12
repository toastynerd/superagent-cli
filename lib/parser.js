var FLAGS = {'-d': 'detail', '--detail': 'detail', '-v': 'verbose', 
              '--verbose': 'verbose'};
/* Parser
 * the parser object used to parse command line options
 */

var Parser= function() {
  return this;
};

/*
 * Parser.prototype.parse
 * Create a request object that will be passed to superagent-cli
 */

Parser.prototype.parseRequest = function(input, request) {
  request.hostname = input[0];
  request.method = input[1];
  if (input[2]) {
    request.data = JSON.parse(input[2]);
  }

  return true;
};

/* 
 * Parser.prototype.parse
 * strip out flags before creating a request object
 */
  
Parser.prototype.parse = function(input) {
  var request = {};
  if (!input.length || input[0] === '-h' || input[0] === '--help') {
    request.help = true;
    return request; 
  }

  /*
   * checking for basic http auth in the form of username:password
   */
  var authIndex = input.indexOf('-u');
  if (authIndex >= 0) {
    auth = input[authIndex + 1];
    parsedAuth = auth.split(':');
    request.user = parsedAuth[0];
    request.password = parsedAuth[1];
    input.splice(authIndex + 1, 1);
    input.splice(authIndex, 1);
  }
  
  input.forEach(function(flag, index, arr) {
    if (FLAGS[flag]) {
      request[FLAGS[flag]] = true; 
      arr.splice(index, 1);
    } 
  });

  if (input.length === 1) {
    input.push('get');
  }

  this.parseRequest(input, request);
  return request;
}; 

var parser = new Parser();

module.exports = parser;
