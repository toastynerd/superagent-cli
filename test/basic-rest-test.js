var rootPath = require('app-root-path');
var chai = require('chai');
var expect = chai.expect;
var superagentcli = require(rootPath + '/lib/superagent-cli');
require(rootPath + '/test/testserver.js');

describe('basic rest requests', function() {

  it('should be able to make a basic get request', function(done) {
    var request = {
      hostname: 'http://localhost:3000',
      method: 'get'
    };

    superagentcli(request, function(err, res) {
      expect(res.text).to.eql('get okay');  
      done();
    });
  });

  it('should be able to make a post request', function(done) {
    var request = {
      hostname: 'http://localhost:3000',
      method: 'post',
      data: {'msg': 'post okay'}
    };

    superagentcli(request, function(err,res) {
      expect(res.body.msg).to.eql('post okay');
      done();
    });	
  });

  it('should be able to make a put request', function(done) {
    var request = {
      hostname: 'http://localhost:3000',
      method: 'put',
      data: {'msg': 'put okay'}
    };

    superagentcli(request, function(err, res) {
      expect(res.body.msg).to.eql('put okay');
      done();
    });
  });

  it('should be able to make a patch reques', function(done) {
    var request = {
      hostname: 'http://localhost:3000',
      method: 'patch',
      data: {'msg': 'patch okay'}
    };

    superagentcli(request, function(err, res) {
      expect(res.body.msg).to.eql('patch okay');
      done();
    });
  });

  it('should be able to make a delete request', function(done) {
    var request = {
      hostname: 'http://localhost:3000',
      method: 'delete'
    };

    superagentcli(request, function(err, res) {
      expect(res.text).to.eql('delete okay');
      done();
    });
  });
});
