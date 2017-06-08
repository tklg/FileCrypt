## FCrypt
A webcrypto wrapper for files

**Install:**

```bash
npm i --save-dev filecrypt
```

**Usage:**

```javascript
import FCrypt from 'filecrypt';
```
Generating an encryption key:
```javascript
FCrypt.generateKey()
.then(key => {
    // key is a CryptoKey object
    console.log(key);
});
```
Wrapping and unwrapping a *CryptoKey* for storage:
```javascript
FCrypt.wrapKey(keyToWrap, wrappingKey)
.then(key => {
    // key is an ArrayBuffer representing the wrapped key
    console.log(key);
});
FCrypt.unwrapKey(wrappedKey, unwrappingKey)
.then(key => {
    // key is a CryptoKey
    console.log(key);
});
```
Importing and exporting a *CryptoKey* for insecure storage:
```javascript
FCrypt.exportKey(key)
.then(buf => {
    // buf is an ArrayBuffer
    console.log(buf);
});
FCrypt.importKey(buf)
.then(key => {
    // key is a CryptoKey
    console.log(key);
});
```
Encrypting and decrypting:
```javascript
input.addEventListener('change', function(e) {
	var file = e.target.files.item(0);
	FCrypt.encrypt(key, file) // key is a CryptoKey
	.then(res => {
	    let {result, iv} = res;
	    console.log(iv.buffer); // the ArrayBuffer containing the iv used to encrypt
	    console.log(result); // the ArrayBuffer containing the encrypted data
	});
});

FCrypt.decrypt(key, iv, buffer)
.then(data => {
    // data is an ArrayBuffer containing the decrypted data
    console.log(data);
});
```
Saving the iv together with the encrypted file:
```javascript
var merged = FCrypt.mergeIvAndData(iv.buffer, result);
// merged is iv buffer prepended to result buffer

let {iv, data} = FCrypt.splitIvAndData(merged);
console.log(iv);
console.log(data);
// iv and data are ArrayBuffers
```
Extra utilities:
```javascript
// ArrayBuffer to base64 string
FCrypt.ab2str(arrayBuffer);

// base64 string to ArrayBuffer
FCrypt.str2ab(b64str);

// ArrayBuffer to File
FCrypt.ab2file(arrayBuffer);

// File to ArrayBuffer
FCrypt.file2ab(file)
.then(buffer => console.log(buffer));
```