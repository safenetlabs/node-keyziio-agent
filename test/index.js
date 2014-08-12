/**
 * Created by dpitard on 8/6/14.
 */
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var nock = require("nock");
var should = require('chai').should();
var kagent = require('../index');

describe('#keyziio-agent', function(){
    var kagent;
    beforeEach(function(){
        kagent = require('../index');
        kagent.set_token("cnZNqHoOXDML9eSSZI").should.equal(true);
    });

    it ('sets and gets the token', function() {
        kagent.set_token("testtoken").should.equal(true);
        kagent.get_token().should.equal('testtoken')
    });

    it ('checks against the server', function(done) {
        var mock = nock('http://keyziio.herokuapp.com')
            .log(console.log)
            .filteringPath(/api_token=[^&]*/g, 'api_token=XXX')
            .get('/api/v1/check?api_token=XXX')
            .reply(200, {
            });

        kagent.check().should.eventually.equal(true).notify(done);
    });

    it ('tells me a user is not there', function(done){
        var mock = nock('http://keyziio.herokuapp.com')
            .log(console.log)
            .filteringPath(/api_token=[^&]*/g, 'api_token=XXX')

            .get('api/v1/users/fakeid?api_token=XXX')
            .reply(404);

        kagent.get_user("fakeid").should.be.rejected.notify(done);
    });

    it ('creates a new user', function(done){
        var uid = Math.random().toString().substring(2);
        var mock = nock('http://keyziio.herokuapp.com')
            .log(console.log)
            .filteringPath(/api_token=[^&]*/g, 'api_token=XXX')
            .post('/api/v1/users?api_token=XXX','asp_id=' + uid +'&friendly_name=friendly')
            .reply(201)
            .get('/api/v1/users/' + uid + '?api_token=XXX')
            .reply(200);

        kagent.create_user(uid, "friendly")
            .then(kagent.get_user(uid))
            .should.eventually.be.fulfilled.notify(done);
     });
});
