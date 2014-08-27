var rootPath = require('app-root-path');
var chai = require('chai');
var expect = chai.expect;
var parser = require(rootPath + '/lib/parser');

describe('parser', function() {
  it('should be able to create a get request', function() {
    var args = ["http://google.com", "get"];
    var result = parser.parse(args);
    expect(result.hostname).to.eql('http://google.com');
    expect(result.method).to.eql('get');
  });

  it('should be able to create a post with json data', function() {
    var args = ['http://google.com', 'post', '{"hello": "world"}'];
    var result = parser.parse(args);
    expect(result.hostname).to.eql('http://google.com');
    expect(result.method).to.eql('post');
    expect(result.data).to.be.ok;
    expect(result.data.hello).to.eql('world');
  });

  it('should be able to get help', function() {
    var result = parser.parse(['-h']);
    expect(result['help']).to.be.true;
    var result2 = parser.parse([]);
    expect(result2['help']).to.be.true;
    var result3 = parser.parse(['--help']);
    expect(result3['help']).to.be.true;
  });

  it('should be able to set flags and still have a get request', function() {
    var args = ['http://google.com', 'get', '-d'];
    var result = parser.parse(args);
    expect(result.method).to.eql('get');
    expect(result.hostname).to.eql('http://google.com');
    expect(result['detail']).to.be.true;
  });

  it('should be able to set flags with a post request', function() {
    var args = ['http://google.com', 'post','--detail', '{"hello":"world"}'];
    var result = parser.parse(args);
    expect(result.data.hello).to.eql('world');
    expect(result['detail']).to.be.true;
  });
});
