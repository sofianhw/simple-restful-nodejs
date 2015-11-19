var should = require('should'); 
var assert = require('assert');
var request = require('supertest'); 
var mongoose = require('mongoose');

describe('Hewan', function() {
  	it('should return Hewan created!', function(done) {
	  	var hewan = {
	  		name: "Coba"
	  	};
	  	request('http://localhost:8080')
	  		.post('/api/hewans')
	  		.send(hewan)
	  		.expect(200)
	  		.end(function(err,res) {
				if (err) {
					throw err;
				}
				res.body.message.should.equal('Hewan created!');
				done();
			});
		});
  });



