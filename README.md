## FileCrypt
A webcrypto wrapper for files

**Install:**

```bash
npm i --save-dev filecrypt
```

**Usage:**

```javascript
import FileCrypt from 'filecrypt';
```
Generating an encryption key:
```javascript
FileCrypt.generateKey()
.then(key => {
    // key is a CryptoKey object
    console.log(key);
});
```
Generating an encryption key from a password:
```javascript
FileCrypt.importPassword(password)
.then(key => {
    // key is a CryptoKey object
    console.log(key);
});
```
Deriving an encryption key from another key:
```javascript
FileCrypt.deriveKey(fromKey, salt, iterations)
.then(key => {
    // key is a CryptoKey object
    console.log(key);
});
```
Wrapping and unwrapping a *CryptoKey* for storage:
```javascript
FileCrypt.wrapKey(keyToWrap, wrappingKey)
.then(data => {
    const {key, iv} = data;
    // key is an ArrayBuffer representing the wrapped key, iv is the iv used
    console.log(key);
});
FileCrypt.unwrapKey(wrappedKey, unwrappingKey, iv)
.then(key => {
    // key is a CryptoKey
    console.log(key);
});
```
Importing and exporting a *CryptoKey* for insecure storage:
```javascript
FileCrypt.exportKey(key)
.then(buf => {
    // buf is an ArrayBuffer
    console.log(buf);
});
FileCrypt.importKey(buf)
.then(key => {
    // key is a CryptoKey
    console.log(key);
});
```
Encrypting and decrypting:
```javascript
input.addEventListener('change', function(e) {
	var file = e.target.files.item(0);
	FileCrypt.encrypt(key, file) // key is a CryptoKey
	.then(res => {
	    let {result, iv} = res;
	    console.log(iv.buffer); // the ArrayBuffer containing the iv used to encrypt
	    console.log(result); // the ArrayBuffer containing the encrypted data
	});
});

FileCrypt.decrypt(key, iv, buffer)
.then(data => {
    // data is an ArrayBuffer containing the decrypted data
    console.log(data);
});
```
Saving the iv together with the encrypted file:
```javascript
var merged = FileCrypt.mergeIvAndData(iv.buffer, result);
// merged is iv buffer prepended to result buffer

let {iv, data} = FileCrypt.splitIvAndData(merged);
console.log(iv);
console.log(data);
// iv and data are ArrayBuffers
```
Extra utilities:
```javascript
// ArrayBuffer to base64 string
FileCrypt.ab2str(arrayBuffer);

// base64 string to ArrayBuffer
FileCrypt.str2ab(b64str);

// ArrayBuffer to File
FileCrypt.ab2file(arrayBuffer);

// File to ArrayBuffer
FileCrypt.file2ab(file)
.then(buffer => console.log(buffer));
```