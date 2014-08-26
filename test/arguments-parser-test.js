var rootPath = require('app-root-path');
var chai = require('chai');
var expect = chai.expect;
var parser = require(rootPath + '/lib/parser');

describe('parser', function() {
  it('should be able to create a git request', function() {
    var args = "http://google.com get";
    var result = parser.parse(args);
    expect(result.hostname).to.eql('http://google.com');
    expect(result.method).to.eql('get');
  });

  it('should be able to create a post with json data', function() {
    var args = "http://google.com post {'hello': 'world'}";
    var result = parser.parse(args);
    expect(result.hostname).to.eql('http://google.com');
    expect(result.method).to.eql('post');
    expect(JSON.parse(result.data)).to.be.ok;
  });
});
