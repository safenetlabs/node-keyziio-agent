node-keyziio-agent
=============

A Node.js interface library for the Keyziio key management and encryption service.  Asynchronous methods use promises.

### Setting the API Token

```javascript
kagent.set_token("token");
```

### Checking the API Token

```javascript
kagent.check()
    .then(function(){
        console.log("Successfully connected to SafeX using API Token")
    })
    .catch(function(e) {
        console.warn("WARNING: Was unable to verify connection to SafeX using the API Token")
    });
```

### Getting User Infomration

```javascript
kagent.get_user(id)
  .then(function(data){
    // Got the user
  })
  .catch(function(e) {
    // Failed to get the user -- doesn't exist?
  });
```

### Creating a New User

```javascript
 kagent.create_user(id, friendly_name)
    .then(function(data){
      // User created!
    })
    .catch(function(e){
      // Failed to create user
    });
```

### Testing

Run the `make` command in the top directory to test.  By default it will run the tests against a mock of the keyziio server.   To run the tests against the actual keyziio service set the environment variable NOCK_OFF to `true`.

`export NOCK_OFF=true`

Server API
==========

The documentation for the keyziio server API is here: http://docs.keyziio.apiary.io/
This API is used both by the keyziio agent and the keyziio crypto library.
