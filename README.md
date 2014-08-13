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

This is the API the node agent is using to communication with the keyzi.io server.

Most calls to the server must include an api_token parameter.  The documentation
for each call will indicate whether the api_token is required.

All calls to the server REST API are prefaced with /api/v1.

## Check

Purpose: Check the validity of the api token.

Returns: 200 if the token is valid, and 401 otherwise.

   GET https://keyziio.herokuapp.com/api/v1/check

### Params

- api_token

## Get user

Purpose: Get properties of a user.

Returns: user data in json, or 404

    GET https://keyziio.herokuapp.com/api/v1/users/:asp_id

### Path Segments

- asp_id: Your internal, static ID for the user.

### Params

- api_token

### Sample response

```json
{
id: "83e2734d-ade7-49eb-a167-cf2b85e8eb7b"
asp_id: "1"
friendly_name: "bob"
public_key: "-----BEGIN PUBLIC KEY-----\ MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2vxGbtFZd2pkdV3fwYMh\ g+ucISw9B2M+fyTpRZjZRX9pTbC7sY3amDFYOYa4uSqIS0jzWtjtEqH8/WOXtorY\ ze1Vv+P6e3UVlpyqIgvu+4Px1nHwLRip2PZYmQTvHPs+pQ+z4KXPXvHh9OWVvNkd\ P2ubYkSdW2W8OuxWxlEp9wMk5Dlavw6TYyeyzdXI0ceFK1D0N2xdNDkWgjVjiXLY\ UT9sfe6YQASbNrXGqIWhJ4k4ygUFn7cRYuan6ux5Au1XIOfbPvkrxsOfccIXuMVz\ bOEN2mHN4siKXeeoFBjKQCXulU3KmQEz6W5r4i9KiuYWBsjkyzknFqnyo2xFfOqe\ CQIDAQAB\ -----END PUBLIC KEY-----\ "
private_key: "-----BEGIN RSA PRIVATE KEY-----\ MIIEpAIBAAKCAQEA2vxGbtFZd2pkdV3fwYMhg+ucISw9B2M+fyTpRZjZRX9pTbC7\ sY3amDFYOYa4uSqIS0jzWtjtEqH8/WOXtorYze1Vv+P6e3UVlpyqIgvu+4Px1nHw\ LRip2PZYmQTvHPs+pQ+z4KXPXvHh9OWVvNkdP2ubYkSdW2W8OuxWxlEp9wMk5Dla\ vw6TYyeyzdXI0ceFK1D0N2xdNDkWgjVjiXLYUT9sfe6YQASbNrXGqIWhJ4k4ygUF\ n7cRYuan6ux5Au1XIOfbPvkrxsOfccIXuMVzbOEN2mHN4siKXeeoFBjKQCXulU3K\ mQEz6W5r4i9KiuYWBsjkyzknFqnyo2xFfOqeCQIDAQABAoIBAHM8/vOiR6qH2oXI\ +M8k6qY5ftgWJ6eTmnfePMPbQ7tG6Wtw7dTqCXa9wOfE9cC7mS3FHgtYzKlZhYDy\ wAvX1W/Iza9FkbMWUl4H46A3F3RUYxeure2NZRQ/zy/3YL2nmbfTI528o/wa3gW6\ K6pNtw6A2ixEX2qRhxSa+q8yVxsdGv5TQibxCe6tNASX6JKmPB5B3+AF1gu2qGO5\ WKgrezcocCEGYsRv4NAiGWEfxnchEamcXJj14DVFfiEGhOnItyWEO0uU/fnf/hI2\ DewlWmwifj8FCD0XmS21O/IynCJQcO+Ny1wC7Th1RZTx3/is3shxmq9+XhnXvQbo\ fJw7ZAECgYEA9+6STlFZ8D0RBB4iwXevi3Q9se5oEGWRrbTmGzW908AuoOeNUQs0\ zFnmCePIiSW9GCe23reY47PpluqNrZRNS60StS+z3ghh+NQmZHzWrifmRyZDj+I2\ Z25JlMTNgGqs0ftu9GC37nfnmZGxn8kVR3pQaYgaGX0x8EmWkAynHBECgYEA4hyP\ tR6GQLGlH0NbC0/FFgHppTQDIG/Iz8EfkMNQ/eVr9BNkZbVL/452tgjIcGCERKja\ IYXSGaXrhfABZonH4kD5yC0yliPSmQAnP8b7ugj3X6mzp79emtmoVh6rj4NP/pzZ\ WhiWo1y5XvnqH4tiiWMyU7R5v6/9sEsvh3DqunkCgYBEoQBUt4YazvyP1DuwrA2m\ n4WYZDLgHw1lNQbhD049eBwwJAhlH6H80wGvSSMwe4bNUej324Bxv1JwmPqgysVe\ pkjgaJT0aAOemjMKa9gNGzROC5R2FpsSpF+v045C9sRh16SN9tvTIdO1GbQ+U64V\ PBFYNPlshtA1AFmyBB6Z0QKBgQDRDdksezFjRRvG4O6fcbxl0ZTlQkaVyeSfeQ4n\ OP58EI8UFo3fn5TJjj1hppMzm3kPRhKPpfuP7SDqL/ILjN366VpH4sn/mNVQ0px3\ UhFRepLEptFNChl9EDqcjTTPtnfSj9BBhbRZDBTzpBr72VJcdhOE4rsiKKRkR8+E\ 6TiM+QKBgQChT8NCoq331iYqaaMv1dCK7/jFXnyDHvf3cNW+TRaiP8l4EHUpXlew\ u5XMa+kaFRJVGF+AjnFZERS2Oqmoj4zNxNZXfuDZX8zKwLf/zl8dZRmKi7In3+Wy\ YQ/bDpQpyPNE2D5IGH4sSRSCpWIoWHumJmQzJe36pjICbeZiiIFWKA==\ -----END RSA PRIVATE KEY-----\ "
created_at: "2014-08-13T20:43:00.150Z"
updated_at: "2014-08-13T20:43:00.150Z"
}
```

## Create user

Purpose: Create a new user.

    POST https://keyziio.herokuapp.com/api/v1/users?api_token=123&friendly_name=Bob&asp_id=server_providers_internal_id_for_user

### Params

- api_token
- friendly_name: A label for the user, to make your admin console
  easier to read.  e.g. an email or real person name
- asp_id: Your unique, static, internal id for this user.  You'll use
  this id to refer to the user in other api calls.

Response format is exactly the same as for get user.

## Get/Create data key

Purpose: Get a data key for encryption.  If the key doesn't exist,
it will be created automatically.

Returns: a json response

    GET https://keyziio.herokuapp.com/api/v1/data_keys/:name

### Path Segments

- name: The name of the key, e.g. 'email_key' or 'file_encryption_key'.
  The number of keys and the names of those keys for each user are up to the
  requirements of your service.

### Params

- user_id: The id of the user for which to create the key.  This must match
  the 'id' field of the response to a get user call.  It's a UUID.  It is not
  the 'asp_id' of the user, but rather our internal unique id.

### Sample Response

```json
{
id: "0856b153-f22e-4392-b88f-bb7ade8e9572"
name: "email_key"
size: 256
key: "fClYH+yX1qcOwwX4tTsyS/YT9MpNak0liHOsJmL/3T/qvl5EVeozJYypmGiWfwEEiFOtzcI2ltyZdRhmY3ki//KZaqgUdd0gV2PMsbne8+0L/sbx3PavWAvt7FIBilClB+lJZ/K3g+dO/thwhKeUpo32/3b+6tYkY1NW5xTqDP1Buzjfh4p7cQux3+tExqAwCXZOxqPN+vCsq47f1Vu0Zk3ahk9LX/HfT0cRwdxbL9OJzh2P6erv8Szz9FCyi2Yr1vYwqQQqSFObEk3SWYVPCXAusoId86qdeA6VoBxtVbjEOv9/NWsOMeOVTEYwT0nhqkZEmJSviTfZeXG9vrWp5g=="
iv: "Ux4tdnq2q04ufNUgT8BKeA=="
created_at: "2014-08-13T20:54:19.992Z"
updated_at: "2014-08-13T20:54:19.992Z"
}
```
