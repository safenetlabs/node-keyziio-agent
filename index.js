/**
 * Created by dpitard on 8/6/14.
 */

var request = require('request');
var Promise = require('promise');

var token;

module.exports = {
    set_token: function(in_token) {
        token = in_token;
        return true;
    },

    get_token: function() {
        return token;
    },

    check: check,

    get_user: get_user,

    create_user: create_user
};

function check2(){
    var promise = new Promise(function(resolve, reject){
        request("http://safex-demo.herokuapp.com/api/v1/check?api_token=" + token, function(error, resp, body){
            if (!error && resp.statusCode == 200) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        });
    });
    //return promise;
}

function check(callback) {
    url = "http://safex-demo.herokuapp.com/api/v1/check?api_token=" + token
    request.get(url, function (error, resp, body) {
        if (!error && resp.statusCode == 200) {
            callback(true)
        }
        else {
            callback(false)
        }
    });
}

function get_user(id, callback) {
    var url = "http://safex-demo.herokuapp.com/api/v1/users/" + id + "?api_token=" + token;
    request.get(url,
        {headers: {
            'Accept': 'application/json'
            },
            json: true
        },
        function (error, resp, body){
        if (!error && resp.statusCode == 200) {
            callback(body, false)
        }
        else {
            callback(null, true)
        }
    });
}

function create_user(id, friendly_name, callback) {
    var url = "http://safex-demo.herokuapp.com/api/v1/users?api_token=" + token;
    request.post(url,
        {form: {asp_id: id, friendly_name: friendly_name},
         headers: {
             'Accept':'application/json'
         },
         json: true
        },

        function(error, resp, body){
            if (!error && resp.statusCode == 201) {
                callback(body, false)
            }
            else {
                callback(null, true)
            }
    })
}
