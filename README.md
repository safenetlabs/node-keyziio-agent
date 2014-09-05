node-keyziio-agent
==================

Node Agent for connecting via OAUTH2 to Keyzi.io service

Agent exposes the following:

  get_token(callback)
  
  Call get_token to initialize the agent and get a valid bearer token from the keyzi.io server.  If a bearer token already exists in the instance - it will be returned without calling the server
  
  get_keypart(callback)
  check_token(callback)
  create_keychain(name, callback)
  get_keychain(id, callback)
  token_hash
  error
