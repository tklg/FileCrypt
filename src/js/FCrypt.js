/*
	FCrypt
	A class to encrypt and decrypt files with AES GCM
*/

import {
	generateKey,
	importKey,
	exportKey,
	wrapKey,
	unwrapKey,
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

export default class FCrypt {
	static ab2str(b) {
		return ab2str(b);
	}
	static str2ab(s) {
		return str2ab(s);
	}
	static file2ab(f) {
		return file2ab(f);
	}
	static ab2file(b) {
		return ab2file(b);
	}
	static mergeIvAndData(iv, data) {
		return mergeIvAndData(iv, data);
	}
	static splitIvAndData(data) {
		return splitIvAndData(data);
	}
	static generateKey() {
		return generateKey();
	}
	static exportKey(key) {
		return exportKey(key);
	}
	static importKey(buf) {
		return importKey(buf);
	}
	static wrapKey(key, wKey) {
		return wrapKey(key, wKey);
	}
	static unwrapKey(buf, uKey) {
		return unwrapKey(buf, uKey);
	}
	static encrypt(key, file, authData) {
		return file2ab(file).then(buf => {
			return encrypt(key, buf, authData);
		})
	}
	static decrypt(key, iv, file, authData) {
		return new Promise((resolve, reject) => {
			decrypt(key, iv, file, authData)
			.then(decryptedBuffer => {
				resolve(decryptedBuffer);
			})
			.catch(err => {
				reject(err);
			})
		})
	}
}