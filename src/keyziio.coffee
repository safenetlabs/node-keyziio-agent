# node-keyziio-agent
#
# connect host server to keyziio cloud based key server
#

request = require 'request'
config = require './config.json'

class keyziioAgent

  requiredConfigItems = [
    "protocol",
    "keyziio_url",
    "token_url",
    "id",
    "secret"
  ]

  verify = (config) ->
    arrayOfKeys = Object.keys(config)
    for item in requiredConfigItems
      if item in arrayOfKeys
        if config[item] == ""
          @error item + ' has no value'
          return false
      else
        @error 'config.json is incomplete'
        return false
    true


  constructor : (config)->

    if verify config
      # the session oauth token
      # access_token  : ...
      # token_type    : 'bearer'
      # scope         : ...
      @token_hash = null

    else
      @error 'failed to initialize'

  error : (e) ->
    console.log e

  get_token : (callback) ->
    body = 'grant_type' : 'client_credentials'
    if config.id? && config.secret?
      if @token_hash?
        @token_hash
      else
        url = config.protocol + config.keyziio_url + config.token_url
        request
          method: 'POST'
          'auth':
            'user': config.id
            'pass': config.secret
          url: url
          headers :
            'User-Agent' : 'Node'
          json : body
          gzip : true
        , (error, response, body) =>
          if response?
            if response.statusCode == 200
              @token_hash = body
              callback @token_hash
            else
              callback @error 'error response code:' + response.statusCode + ' body:' + body
          else
            callback @error 'no response'
    else
      callback @error 'agent not initialized'

  check_token : (callback) ->
    if @token_hash?
      url = config.protocol + config.keyziio_url + config.token_info
      request
        method  : 'GET'
        headers :
          'User-Agent' : 'Node'
        url     : url
        json    : true
        'auth'  :
          'bearer'  : @token_hash.access_token
      , (error, response, body) =>
        callback @error body
    else
      callback @error 'You do not have a token to verify'

  create_keychain : (name, callback) ->
    url = config.protocol + config.keyziio_url + config.keychains
    @get_keypart( (r)=>
      body =
        'name'    : name
        'keypart' : r.bytes
      request
        method  : 'POST'
        headers :
          'User-Agent' : 'Node'
        url     : url
        json    : body
        'auth'  :
          'bearer'  : @token_hash.access_token
      , (error, response, body) =>
          callback body
    )

  get_keychain : (id, callback) ->
    url = config.protocol + config.keyziio_url + config.keychains + "/" + id
    request
      method  : 'GET'
      url     : url
      json    : true
      'auth'  :
        'bearer'  : @token_hash.access_token
    , (error, response, body) =>
        callback body

  get_keypart : (callback) ->
    url = config.protocol + config.keyziio_url + config.get_keypart
    request
      method  : 'POST'
      url     : url
      json    : true
      'auth'  :
        'bearer'  : @token_hash.access_token
    , (error, response, body) =>
        callback body


agent = new keyziioAgent config

module.exports =

  get_token       : agent.get_token
  get_keypart     : agent.get_keypart
  check_token     : agent.check_token
  create_keychain : agent.create_keychain
  get_keychain    : agent.get_keychain
  token_hash      : agent.token_hash
  error           : agent.error
