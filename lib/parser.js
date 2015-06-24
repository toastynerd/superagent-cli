var fs = require('fs');
var vm = require('vm')

var FLAGS = {'-d': 'detail', '--detail': 'detail', '-v': 'verbose', 
              '--verbose': 'verbose'};

var parseCmdObject = function(input) {
  var parsed;
  try {
    parsed = JSON.stringify(vm.runInThisContext('new Object(' + input.join('') + ')'));
  } catch(e) {
    if (e.message === 'Unexpected identifier') 
      throw new Error("Error parsing object notation, remember to escape quotes on strings ex: {hello: \\\"world\\\"}");
    else
      throw e;
  }
  return parsed;
};

/* Parser
 * the parser object used to parse command line options
 */

var Parser = function() {
  return this;
};

/*
 * Parser.prototype.parse
 * Create a request object that will be passed to superagent-cli
 */

Parser.prototype.parseRequest = function(input, request) {
  request.hostname = input[0];
  request.method = input[1];
  
  var data = ((input.length > 3) ? parseCmdObject(input.slice(2)) : input[2]);
  if (data) request.data = JSON.parse(data);

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
    var auth = input[authIndex + 1];
    var parsedAuth = auth.split(':');
    request.user = parsedAuth[0];
    request.password = parsedAuth[1];
    input.splice(authIndex + 1, 1);
    input.splice(authIndex, 1);
  }

  /*
   * optional timout setting
   */
  var timeoutIndex = input.indexOf('-t');
  if (timeoutIndex >= 0) {
    request.timeout = parseInt(input[timeoutIndex + 1]);
    input.splice(timeoutIndex + 1);
    input.splice(timeoutIndex);
  }
  
  /*
   * checking for a post body input file
   */
  var jsonFileIndex = input.indexOf('-f');
  if (jsonFileIndex >= 0) {
    var filePath = input[jsonFileIndex + 1];
    var content = fs.readFileSync(filePath);
    input.push(content.toString());    
    input.splice(jsonFileIndex + 1, 1);
    input.splice(jsonFileIndex, 1);
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
