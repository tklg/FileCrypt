import {
  str2ab
} from './util.js'

const subtleCrypto = window.crypto.subtle
const keyUsages = ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']
const keyType = 'jwk'

function stringToArrayBuffer(string) {
  var encoder = new TextEncoder('utf-8')
  return encoder.encode(string)
}

function generateKey() {
  var opts = [{
      name: 'AES-GCM',
      length: 256 // can be  128, 192, or 256
    },
    true, // whether the key is extractable (i.e. can be used in exportKey)
    keyUsages // can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
  ]

  return subtleCrypto.generateKey(...opts)
}

function importKey(key) {
  if (typeof key === 'string') {
    key = str2ab(key)
  }
  var opts = [
    keyType, // can be "jwk" or "raw"
    key,
    { // this is the algorithm options
      name: 'AES-GCM',
      length: 256
    },
    true, // whether the key is extractable (i.e. can be used in exportKey)
    keyUsages // can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
  ]
  return subtleCrypto.importKey(...opts)
}

function exportKey(key) {
  return subtleCrypto.exportKey(keyType, key)
}

function wrapKey(key, wrappingKey) {
  var iv = window.crypto.getRandomValues(new Uint8Array(12))
  var opts = [
    keyType,
    key,
    wrappingKey,
    {
      name: 'AES-GCM',
      iv: iv,
      tagLength: 128
    }
  ]
  return new Promise((res, rej) => {
    subtleCrypto.wrapKey(...opts).then(data => {
      res({
        key: data,
        iv
      })
    }).catch(e => {
      rej(e)
    })
  })
}

function unwrapKey(wrappedKey, unwrappingKey, iv) {
  var opts = [
    keyType,
    wrappedKey,
    unwrappingKey, {
      name: 'AES-GCM',
      iv: iv,
      tagLength: 128
    }, {
      name: 'AES-GCM',
      length: 256
    },
    true,
    keyUsages
  ]
  return subtleCrypto.unwrapKey(...opts)
}

function deriveKey(key, salt, iterations) {
  if (salt == undefined || salt && salt.length == 0) salt = 'filecryptsalt'
  if (typeof salt === 'string') salt = stringToArrayBuffer(salt)

	// console.log(key)
  var opts = [{
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations || 1000,
      hash: 'SHA-256'
    },
    key,
    {
      name: 'AES-GCM',
      length: 256
    },
    true,
    keyUsages
  ]
  return subtleCrypto.deriveKey(...opts)
}

function importPassword(pass) {
  if (typeof pass === 'string') pass = stringToArrayBuffer(pass)
  var opts = [
    'raw',
    pass,
    {
      name: 'PBKDF2'
    },
    false,
    ['deriveKey']
  ]
  return subtleCrypto.importKey(...opts)
}

export {
  generateKey,
  importKey,
  exportKey,
  wrapKey,
  unwrapKey,
  deriveKey,
  importPassword
}