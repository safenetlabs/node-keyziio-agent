/**
 * Created by dpitard on 8/6/14.
 */

require('mocha-sinon');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var should = require('chai').should();
var aasguard = require('../index');

describe('#aasguard', function(){
    var aasguard;
    beforeEach(function(){
        aasguard = require('../index');
        aasguard.set_token("slZxxbJai9hOWyRRYBrMWA").should.equal(true);
    });

    it ('runs a non test', function() {
        true.should.equal(true);
    });

    it ('sets and gets the token', function() {
        aasguard.set_token("testtoken").should.equal(true);
        aasguard.get_token().should.equal('testtoken')
    });

    it ('checks against the server', function(done) {
        //aasguard.check().should.eventually.equal(true);

        aasguard.check(function(ok){
                ok.should.equal(true)
                done()
            }
        )
    });

    it ('tells me a user is not there', function(done){
        aasguard.get_user("fakeid", function(user, error){
            error.should.equal(true);
            done()
        })
    });

    it ('creates a new user', function(done){
        var uid = Math.random().toString().substring(2);
        aasguard.create_user(uid, "friendly", function(user, error){
            error.should.equal(false);

            aasguard.get_user(uid, function(user, error){
                error.should.equal(false)
                done()
            })
        })
    })
});
