node-keyziio-agent
==================

Node Agent for connecting via OAUTH2 to Keyzi.io service

Agent exposes the following:

    get_token(callback)
  
  Call get_token to initialize the agent and get a valid bearer token from the keyzi.io server. If a bearer token already exists in the instance - it will be returned without calling the server.  If there is an error message - it will return the error function that contains the error message as well as logging the error to the console.  All returned values are via the callback function - so that you can define what you do with the response.
  
  Returns:
  
      { access_token: '04089af5f3a933a07b12d23d16ba1ae03603acc1b55b0b8f3c279f7d5218eeba',
      token_type: 'bearer',
      scope: 'none' }
  

    get_keypart(callback)
  
  All key chains depend on a split key.  In order to create a keychain you must have a keypart.  You dont need to implement this function as it is called automatically as part of the create_keychain function.  The keypart object or error is returned via the callback
  
  Returns:
  
      { bytes: 'R90szYVvpTdltNNfpssjFr1gugdwckhKhpV10FcetlA1JoQu9sObiMagCEqA8Iw+ni2n2eRVu1qjfaQLit1CGkZqMOfaa5y/' }


    check_token(callback)
    
  Call check_token to verify that the bearer token you have is valid.  It is possible for the bearer tokens to be invalidated either through rotation policy or through administration on the keyzi.io server.  If calls fail to the server - check the bearer token to determing is creating a new one is required.
  
  Returns:
  
      { resource_owner_id: null,
        scopes: [ 'none' ],
        expires_in_seconds: null,
        application: { uid: '9e61db7ef1dbddc9f0b812c153f2596126a0a537e96cf50fba76f843bbc4d5c1' } }
  
    create_keychain(name, callback)
    
  Keychains are required for for encryption and decryption by keyziio clients.  The keychain contains a name (defined by you), and id (defined by keyzi.io) and a keypart.  The name provides an optional method for you to identify and look up keychains in the future - and you should take care to make them unique if you want singletons returned.  The id is guaranteed to be unique as is an alternative (and recommended) scheme for you to use to track individual keychains
  
  Returns:
  
      { id: '843f2189-42ed-4da1-a65f-8c1d5d8d03f3',
        name: 'randomname',
        keypart: '79IrCgHaazWhG0wcYvY4onEvVYtfgG0wshlayRo4G2JYg9D66F5Ngara1ZeUk9Jg+dcBRHfqsDPKENruZ8Hr7hoJqQZLdryr' }
  
    get_keychain(id, callback)
    
  Retrieving key chains currently only accepts the id.  Using name to retrieve a keychain is not currently supported.
  
  Returns:
  
      { id: '843f2189-42ed-4da1-a65f-8c1d5d8d03f3',
        name: 'randomname',
        keypart: '79IrCgHaazWhG0wcYvY4onEvVYtfgG0wshlayRo4G2JYg9D66F5Ngara1ZeUk9Jg+dcBRHfqsDPKENruZ8Hr7hoJqQZLdryr' }

  
    token_hash
  
  Calling token_hash will return the bearer token if it exists.  This provides an object reference to the bearer token.  You should use get_token to retrienve the token - since it will return the current instance token_hash via the callback if it already exists - and get a new one if it does not.  If you need to refresh your bearer token - you must set this value to null in order that a subsequent get_token will retrieve a new token from keyzi.io
  
  Returns:
  
      { access_token: '04089af5f3a933a07b12d23d16ba1ae03603acc1b55b0b8f3c279f7d5218eeba',
        token_type: 'bearer',
        scope: 'none' }

  
