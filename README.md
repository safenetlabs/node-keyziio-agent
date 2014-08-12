node-keyziio-agent
=============

A Node.js interface library for the SafeX key management service.  Asynchronous methods use promises.

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
