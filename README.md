
# node-azureTokenValidation
## Description
This class will validate id tokens from Azure B2C by using the public key signing information

### Azure
* [Microsoft identity platform access tokens](https://docs.microsoft.com/en-us/azure/active-directory/develop/access-tokens)
* [Microsoft identity platform and OpenID Connect protocol](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)

### Other
* [JWT.io](https://jwt.io/)

### Node Dependencies
* jsonwebtoken
* node-fetch
* node-forge

## Howto
1. Replace <tenant-name> to the tenant URL found in B2C Azure Portal below Azure AD B2C Tenant
2. Replace <user-flow> to the name from Azure AD B2C > User Flows > Name column. Example (B2C_1_signin)
3. Add the code below to run a test

## Example
Validate an ID token
```js
const atv = new AzureTokenValidation()
const idToken = 'THE_AZURE_ID_TOKEN_HERE' // This will be sent in the callback from Azure B2C

atv.validate(idToken).then(result => {
    if (result) {
        // Token is valid
        console.log(result)
    } else {
        // Token is not valid
    }
})
```
