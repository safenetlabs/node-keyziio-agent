node-aasguard
=============

A Node.js interface library for the SafeX key management service.  Asynchronous methods use promises.

### Setting the API Token:

```javascript
aasguard.set_token("token");
```

### Checking the API Token

```javascript
aasguard.check()
    .then(function(){
        console.log("Successfully connected to SafeX using API Token")
    })
    .catch(function(e) {
        console.warn("WARNING: Was unable to verify connection to SafeX using the API Token")
    });
```

### Getting User Infomration

```javascript
aasguard.get_user(req.params.id)
  .then(function(data){
    // Got the user
  })
  .catch(function(e) {
    // Failed to get the user -- doesn't exist?
  });
```

### Creating a New User
 
```javascript
 aasguard.create_user(req.params.id, "friendly_"+req.params.id)
    .then(function(data){
      // User created!
    })
    .catch(function(e){
      // Failed to create user
    });
```
