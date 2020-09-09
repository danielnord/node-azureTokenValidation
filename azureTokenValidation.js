// Run this by calling ```node tokenValidation.js``` in the console
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
var forge = require('node-forge')

class AzureTokenValidation {
    /**
     * @param {String} idToken The Azure ID token to validate
     */
    async validate(idToken) {
        try {
            const kid = this.getKid(idToken)
            const publicKey = await this.getPublicKey(kid)

            const t = jwt.verify(idToken, publicKey, { algorithms: ['RS256'] })
            return t
        } catch(exception) {
            return false
        }
    }

    /**
     * @param {String} idToken The Azure ID token to get kid from
     */
    getKid(idToken) {
        const decodedJwt = jwt.decode(idToken, {complete: true})
        return decodedJwt.header.kid
    }
    /**
     * @param  {Object} fetchSigningKeyInformation Keys from fetchSigningKeyInformation
     * @param  {String} kid
     */
    async getPublicKey(kid) {
        const signingKeys = await this.fetchSigningKeyInformation()
        const key = signingKeys.keys.find(k => k.kid === kid)
        // console.log(key)
        const msPublicKey = key.x5c[0]
        const PEMSTART = "-----BEGIN CERTIFICATE-----\n"
        const PEMEND = "\n-----END CERTIFICATE-----\n"
        const pem = PEMSTART + msPublicKey + PEMEND
        const certificate = forge.pki.certificateFromPem(pem)
        return forge.pki.publicKeyToPem(certificate.publicKey)
    }

    /**
     * Fetch public signing key information from Microsoft
     */
    async fetchSigningKeyInformation() {
        const urlKeys = 'https://login.microsoftonline.com/common/discovery/v2.0/keys'
        const keys = await fetch(urlKeys, { method: "Get" })
        const jsonKeys = await keys.json()
        return jsonKeys
    }
}
