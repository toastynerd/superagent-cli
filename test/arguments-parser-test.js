var rootPath = require('app-root-path');
var chai = require('chai');
var fs = require('fs');
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

  it('should parse object literals, not just strict json', function() {
    var args = ['http://google.com', 'post', '{hello:', '"world"}']; //command line args of {hello: 'world'}
    var result = parser.parse(args);
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

  it('should be able to send properties with periods in them', function() {
    var args = ['http://google.com', 'post', '{hello: ', '"world.com"}'];
    var result = parser.parse(args);
    expect(result.data).to.be.ok;
    expect(result.data.hello).to.eql('world.com');
  });

  it('should be able to send strings with spaces in them', function(){
    var args = ['http://google.com', 'post', '{hello: ', '"this is dog"}'];
    var result = parser.parse(args);
    expect(result.data).to.be.ok;
    expect(result.data.hello).to.eql('this is dog');
  });

  before(function (done) {
    var bodyObj = {};
    bodyObj.textKey = "This is some text";
    bodyObj.urlKey = "http://www.example.com/test";
    bodyObj.emailKey = "example@example.com";
    var bodyJson = JSON.stringify(bodyObj);
    fs.writeFile('test_file.json', bodyJson, function(err) {
      if (err) return console.log(err);
    });
    done();
  });

  it('should be able to read json data from a file with a post request', function() {
    var args = ['http://google.com', 'post','--detail', '-f','test_file.json'];
    var result = parser.parse(args);
    expect(result.data.emailKey).to.eql('example@example.com');
    expect(result['detail']).to.be.true;
  });

  after(function(done) {
    fs.unlink('test_file.json');
    done();
  });
});
