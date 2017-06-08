import {
	str2ab,
} from './util.js';

const subtleCrypto = window.crypto.subtle;
const keyUsages = ["encrypt", "decrypt", "wrapKey", "unwrapKey"];
const keyType = 'jwk';

function generateKey() {
	var defaultOpts = [
		{
	        name: "AES-GCM",
	        length: 256, //can be  128, 192, or 256
	    },
	    true, //whether the key is extractable (i.e. can be used in exportKey)
	    keyUsages //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
	];

	return subtleCrypto.generateKey(...defaultOpts);
}

function importKey(key) {
	if (typeof key === 'string') {
		key = str2ab(key);
	}
	var defaultOpts = [
		keyType, //can be "jwk" or "raw"
	    key,
	    {   //this is the algorithm options
	        name: "AES-GCM",
	    },
	    true, //whether the key is extractable (i.e. can be used in exportKey)
	    keyUsages //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
	];
	return subtleCrypto.importKey(...defaultOpts);
}

function exportKey(key) {
	return subtleCrypto.exportKey(keyType, key);
}

function wrapKey(key, wrappingKey) {
	var defaultOpts = [
		keyType,
		key,
		wrappingKey,
		'AES-GCM'
	];
	return subtleCrypto.wrapKey(...defaultOpts);
}

function unwrapKey(wrappedKey, unwrappingKey) {
	var defaultOpts = [
		keyType,
		wrappedKey,
		unwrappingKey,
		'AES-GCM',
		true,
		keyUsages
	];
	return subtleCrypto.unwrapKey(...defaultOpts);
}

export {
	generateKey,
	importKey,
	exportKey,
	wrapKey,
	unwrapKey,
}