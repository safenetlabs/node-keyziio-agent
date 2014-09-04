ka = require './keyziio'
ka.get_token( (r)->
  console.log 'get an access token '
  console.log r.access_token
  ka.create_keychain('randomname', (r)->
    console.log 'use it to get a new keychain'
    console.log r
    ka.get_keychain(r.id, (s) ->
      console.log 'and then use the id returned with the get to then retrieve the same keychain'
      console.log s
    )
  )
)

