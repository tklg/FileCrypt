/*
	FileCrypt
	A class to encrypt and decrypt files with AES GCM
*/

import {
	generateKey,
	importKey,
	exportKey,
	wrapKey,
	unwrapKey,
	deriveKey,
	importPassword,
} from './components/key.js';
import {
	encrypt,
	decrypt,
} from './components/encrypt.js';
import {
	ab2str,
	str2ab,
	file2ab,
	ab2file,
	mergeIvAndData,
	splitIvAndData,
} from './components/util.js';

const FileCrypt = {
	ab2str: function(b) {
		return ab2str(b);
	},
	str2ab: function(s) {
		return str2ab(s);
	},
	file2ab: function(f) {
		return file2ab(f);
	},
	ab2file: function(b) {
		return ab2file(b);
	},
	mergeIvAndData: function(iv, data) {
		return mergeIvAndData(iv, data);
	},
	splitIvAndData: function(data) {
		return splitIvAndData(data);
	},
	generateKey: function(key) {
		if (key) return deriveKey(key);
		else return generateKey();
	},
	exportKey: function(key) {
		return exportKey(key);
	},
	importKey: function(buf) {
		return importKey(buf);
	},
	wrapKey: function(key, wKey) {
		return wrapKey(key, wKey);
	},
	unwrapKey: function(buf, uKey, iv) {
		return unwrapKey(buf, uKey, iv);
	},
	deriveKey: function(key) {
		return deriveKey(key);
	},
	importPassword: function(pass, salt, iterations) {
		return importPassword(pass).then(key => deriveKey(key, salt, iterations));
	},
	encrypt: function(key, file, authData) {
		if (file instanceof Blob) {
			return file2ab(file).then(buf => {
				return encrypt(key, buf, authData);
			})
		} else {
			return encrypt(key, file, authData);
		}
	},
	decrypt: function(key, iv, file, authData) {
		return new Promise((resolve, reject) => {
			decrypt(key, iv, file, authData)
			.then(decryptedBuffer => {
				resolve(decryptedBuffer);
			})
			.catch(err => {
				reject(err);
			})
		})
	},
}
module.exports = FileCrypt;
