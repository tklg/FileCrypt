import {
	str2ab,
} from './util.js';

const subtleCrypto = window.crypto.subtle;
const keyUsages = ["encrypt", "decrypt", "wrapKey", "unwrapKey"];
const keyType = 'jwk';

function stringToArrayBuffer(string) {
    var encoder = new TextEncoder("utf-8");
    return encoder.encode(string);
}

function generateKey() {
	var opts = [
		{
	        name: "AES-GCM",
	        length: 256, //can be  128, 192, or 256
	    },
	    true, //whether the key is extractable (i.e. can be used in exportKey)
	    keyUsages //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
	];

	return subtleCrypto.generateKey(...opts);
}

function importKey(key) {
	if (typeof key === 'string') {
		key = str2ab(key);
	}
	var opts = [
		keyType, //can be "jwk" or "raw"
	    key,
	    {   //this is the algorithm options
	        name: "AES-GCM",
	        length: 256,
	    },
	    true, //whether the key is extractable (i.e. can be used in exportKey)
	    keyUsages //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
	];
	return subtleCrypto.importKey(...opts);
}

function exportKey(key) {
	return subtleCrypto.exportKey(keyType, key);
}

function wrapKey(key, wrappingKey) {
	var opts = [
		keyType,
		key,
		wrappingKey,
		'AES-GCM',
	];
	return subtleCrypto.wrapKey(...opts);
}

function unwrapKey(wrappedKey, unwrappingKey) {
	var opts = [
		keyType,
		wrappedKey,
		unwrappingKey,
		'AES-GCM',
		true,
		keyUsages,
	];
	return subtleCrypto.unwrapKey(...opts);
}

function deriveKey(key, salt, iterations) {
	if (salt == undefined || salt && salt.length == 0) salt = 'filecryptsalt';
	if (typeof salt === 'string') salt = stringToArrayBuffer(salt);
	var opts = [
		{
			name: "PBKDF2",
			salt: salt,
			iterations: iterations || 100,
			hash: "SHA-256"
		},
		key,
		{
			name: "AES-GCM",
			length: 256,
		},
		true,
		keyUsages,
	];
	return subtleCrypto.deriveKey(...opts);
}

function importPassword(pass, allowEncrypt) {
	if (typeof pass === 'string') pass = stringToArrayBuffer(pass);
	var opts = [
		'raw',
		pass,
		{name: "PBKDF2"},
		!!allowEncrypt,
		['deriveKey'].concat(allowEncrypt ? keyUsages : []),
	];
	return subtleCrypto.importKey(...opts);
}

export {
	generateKey,
	importKey,
	exportKey,
	wrapKey,
	unwrapKey,
	deriveKey,
	importPassword,
};