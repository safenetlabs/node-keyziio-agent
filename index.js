/**
 * Created by dpitard on 8/6/14.
 */

var request = require('request');
var Promise = require('es6-promise').Promise;

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

function check() {
    return new Promise(function (resolve, reject) {
        var url = "http://safex-demo.herokuapp.com/api/v1/check?api_token=" + token;
        request.get(url, function (error, resp, body) {
            if (error) {
                return reject(error);
            } else if (resp.statusCode != 200) {
                error = new Error("Unexpected status code: " + resp.statusCode);
                error.res = resp;
                return reject(error);
            }
            return resolve(true);
        });
    });
}

function get_user(id) {
    return new Promise(function(resolve, reject){
        var url = "http://safex-demo.herokuapp.com/api/v1/users/" + id + "?api_token=" + token;
        request.get(url,
            {headers: {
                'Accept': 'application/json'
            },
                json: true
            },
            function (error, resp, body){
                if (error) {
                    return reject(error);
                } else if (resp.statusCode !== 200) {
                    error = new Error("Unexpected status code: " + resp.statusCode);
                    error.res = resp;
                    return reject(error);
                }
                return resolve(true);
            });
    });
}

function create_user(id, friendly_name) {
    return new Promise(function(resolve, reject){
        var url = "http://safex-demo.herokuapp.com/api/v1/users?api_token=" + token;
        request.post(url,
            {form: {asp_id: id, friendly_name: friendly_name},
                headers: {
                    'Accept':'application/json'
                },
                json: true
            },

            function(error, resp, body){
                if (error) {
                    return reject(error);
                } else if (resp.statusCode !== 201) {
                    error = new Error("Unexpected status code: " + resp.statusCode);
                    error.res = resp;
                    return reject(error);
                }
                return resolve(body);
            })
    });
}
