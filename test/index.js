/**
 * Created by dpitard on 8/6/14.
 */
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var nock = require("nock");
var should = require('chai').should();
var aasguard = require('../index');

describe('#aasguard', function(){
    var aasguard;
    beforeEach(function(){
        aasguard = require('../index');
        aasguard.set_token("cnZNqHoOXDML9eSSZI").should.equal(true);
    });

    it ('sets and gets the token', function() {
        aasguard.set_token("testtoken").should.equal(true);
        aasguard.get_token().should.equal('testtoken')
    });

    it ('checks against the server', function(done) {
        var mock = nock('http://safex-demo.herokuapp.com')
            .log(console.log)
            .filteringPath(/api_token=[^&]*/g, 'api_token=XXX')
            .get('/api/v1/check?api_token=XXX')
            .reply(200, {
            });

        aasguard.check().should.eventually.equal(true).notify(done);
    });

    it ('tells me a user is not there', function(done){
        var mock = nock('http://safex-demo.herokuapp.com')
            .log(console.log)
            .filteringPath(/api_token=[^&]*/g, 'api_token=XXX')

            .get('api/v1/users/fakeid?api_token=XXX')
            .reply(404);

        aasguard.get_user("fakeid").should.be.rejected.notify(done);
    });

    it ('creates a new user', function(done){
        var uid = Math.random().toString().substring(2);
        var mock = nock('http://safex-demo.herokuapp.com')
            .log(console.log)
            .filteringPath(/api_token=[^&]*/g, 'api_token=XXX')
            .post('/api/v1/users?api_token=XXX','asp_id=' + uid +'&friendly_name=friendly')
            .reply(201)
            .get('/api/v1/users/' + uid + '?api_token=XXX')
            .reply(200);

        aasguard.create_user(uid, "friendly")
            .then(aasguard.get_user(uid))
            .should.eventually.be.fulfilled.notify(done);
     });
});
