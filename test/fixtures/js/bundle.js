/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function ab2str(b) {
    return btoa64(String.fromCharCode.apply(String, _toConsumableArray(new Uint16Array(b))));
}

function str2ab(s) {
    s = atob64(s);
    var b = new ArrayBuffer(s.length * 2);
    var bufView = new Uint16Array(b);
    for (var i = 0, sLen = s.length; i < sLen; i++) {
        bufView[i] = s.charCodeAt(i);
    }
    return b;
}

function file2ab(file) {
    var reader = new FileReader();
    return new Promise(function (resolve, reject) {
        reader.addEventListener('loadend', function () {
            resolve(reader.result);
        });
        reader.readAsArrayBuffer(file);
    });
}

function ab2file(ab) {
    return new File([ab], Date.now().toString(), { type: "application/octet-stream" });
}

function mergeIvAndData(iv, data) {
    var tmp = new Uint8Array(iv.byteLength + data.byteLength);
    tmp.set(new Uint8Array(iv), 0);
    tmp.set(new Uint8Array(data), iv.byteLength);
    return tmp.buffer;
}

function splitIvAndData(data) {
    var iv = data.slice(0, 12);
    var data = data.slice(12);
    return {
        iv: iv,
        data: data
    };
}

function btoa64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}
function atob64(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

exports.ab2str = ab2str;
exports.str2ab = str2ab;
exports.file2ab = file2ab;
exports.ab2file = ab2file;
exports.mergeIvAndData = mergeIvAndData;
exports.splitIvAndData = splitIvAndData;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	FCrypt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	A class to encrypt and decrypt files with AES GCM
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _key = __webpack_require__(3);

var _encrypt2 = __webpack_require__(2);

var _util = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FCrypt = function () {
	function FCrypt() {
		_classCallCheck(this, FCrypt);
	}

	_createClass(FCrypt, null, [{
		key: 'ab2str',
		value: function ab2str(b) {
			return (0, _util.ab2str)(b);
		}
	}, {
		key: 'str2ab',
		value: function str2ab(s) {
			return (0, _util.str2ab)(s);
		}
	}, {
		key: 'file2ab',
		value: function file2ab(f) {
			return (0, _util.file2ab)(f);
		}
	}, {
		key: 'ab2file',
		value: function ab2file(b) {
			return (0, _util.ab2file)(b);
		}
	}, {
		key: 'mergeIvAndData',
		value: function mergeIvAndData(iv, data) {
			return (0, _util.mergeIvAndData)(iv, data);
		}
	}, {
		key: 'splitIvAndData',
		value: function splitIvAndData(data) {
			return (0, _util.splitIvAndData)(data);
		}
	}, {
		key: 'generateKey',
		value: function generateKey() {
			return (0, _key.generateKey)();
		}
	}, {
		key: 'exportKey',
		value: function exportKey(key) {
			return (0, _key.exportKey)(key);
		}
	}, {
		key: 'importKey',
		value: function importKey(buf) {
			return (0, _key.importKey)(buf);
		}
	}, {
		key: 'wrapKey',
		value: function wrapKey(key, wKey) {
			return (0, _key.wrapKey)(key, wKey);
		}
	}, {
		key: 'unwrapKey',
		value: function unwrapKey(buf, uKey) {
			return (0, _key.unwrapKey)(buf, uKey);
		}
	}, {
		key: 'encrypt',
		value: function encrypt(key, file, authData) {
			if (file instanceof Blob) {
				return (0, _util.file2ab)(file).then(function (buf) {
					return (0, _encrypt2.encrypt)(key, buf, authData);
				});
			} else {
				console.log(typeof file === 'undefined' ? 'undefined' : _typeof(file));
				return (0, _encrypt2.encrypt)(key, file, authData);
			}
		}
	}, {
		key: 'decrypt',
		value: function decrypt(key, iv, file, authData) {
			return new Promise(function (resolve, reject) {
				(0, _encrypt2.decrypt)(key, iv, file, authData).then(function (decryptedBuffer) {
					resolve(decryptedBuffer);
				}).catch(function (err) {
					reject(err);
				});
			});
		}
	}]);

	return FCrypt;
}();

exports.default = FCrypt;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var subtleCrypto = window.crypto.subtle;
var defaultAuthData = new Uint8Array([213, 108, 109, 126, 31, 34, 62, 55, 223, 59, 205, 42]).buffer;

function encrypt(key, data, authData) {
	var iv = window.crypto.getRandomValues(new Uint8Array(12));
	var opts = [{
		name: "AES-GCM",
		iv: iv,
		additionalData: authData || defaultAuthData,
		tagLength: 128 //can be 32, 64, 96, 104, 112, 120 or 128 (default)
	}, key, data];
	return new Promise(function (resolve, reject) {
		subtleCrypto.encrypt.apply(subtleCrypto, opts).then(function (result) {
			resolve({ result: result, iv: iv });
		}).catch(function (err) {
			reject(err);
		});
	});
}
function decrypt(key, iv, data, authData) {
	var opts = [{
		name: "AES-GCM",
		iv: iv,
		additionalData: authData || defaultAuthData,
		tagLength: 128
	}, key, data];
	return subtleCrypto.decrypt.apply(subtleCrypto, opts);
}
exports.encrypt = encrypt;
exports.decrypt = decrypt;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.unwrapKey = exports.wrapKey = exports.exportKey = exports.importKey = exports.generateKey = undefined;

var _util = __webpack_require__(0);

var subtleCrypto = window.crypto.subtle;
var keyUsages = ["encrypt", "decrypt", "wrapKey", "unwrapKey"];
var keyType = 'jwk';

function generateKey() {
	var defaultOpts = [{
		name: "AES-GCM",
		length: 256 //can be  128, 192, or 256
	}, true, //whether the key is extractable (i.e. can be used in exportKey)
	keyUsages //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
	];

	return subtleCrypto.generateKey.apply(subtleCrypto, defaultOpts);
}

function importKey(key) {
	if (typeof key === 'string') {
		key = (0, _util.str2ab)(key);
	}
	var defaultOpts = [keyType, //can be "jwk" or "raw"
	key, { //this is the algorithm options
		name: "AES-GCM"
	}, true, //whether the key is extractable (i.e. can be used in exportKey)
	keyUsages //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
	];
	return subtleCrypto.importKey.apply(subtleCrypto, defaultOpts);
}

function exportKey(key) {
	return subtleCrypto.exportKey(keyType, key);
}

function wrapKey(key, wrappingKey) {
	var defaultOpts = [keyType, key, wrappingKey, 'AES-GCM'];
	return subtleCrypto.wrapKey.apply(subtleCrypto, defaultOpts);
}

function unwrapKey(wrappedKey, unwrappingKey) {
	var defaultOpts = [keyType, wrappedKey, unwrappingKey, 'AES-GCM', true, keyUsages];
	return subtleCrypto.unwrapKey.apply(subtleCrypto, defaultOpts);
}

exports.generateKey = generateKey;
exports.importKey = importKey;
exports.exportKey = exportKey;
exports.wrapKey = wrapKey;
exports.unwrapKey = unwrapKey;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*import FileSaver from 'file-saver';
const input = document.getElementById('f1');

input.addEventListener('change', function(e) {
	handle(e.target.files);
});
function handle(_files) {
	var files = [];
	for (var i = 0; i < _files.length; i++) files.push(_files.item(i));
	var file = files[0];
	var ext = file.name.split('.').pop();
	FCrypt.generateKey()
	.then(key => {
		FCrypt.encrypt(key, file)
		.then(res => {
			let {result, iv} = res;

			console.log(iv.buffer);
			console.log(result);
			var dat = FCrypt.mergeIvAndData(iv.buffer, result);
			//console.log(dat);
			{
				let {
					iv,
					data,
				} = FCrypt.splitIvAndData(dat);
				console.log(iv);
				console.log(data);
				//var blob = new Blob([result], {type: "application/octet-stream"});
				//FileSaver.saveAs(blob, 'test.enc.aes');

				FCrypt.decrypt(key, iv, data)
				.then(buf => {

					var blob = new Blob([buf], {type: file.type});
					//FileSaver.saveAs(blob, 'test.' + ext);

				})
			}


		})
		.catch(err => {
			console.error(err);
		})
		FCrypt.exportKey(key)
		.then(data => {
			var keyString = FCrypt.ab2str(data);
			console.log(keyString);
			var keyBuffer = FCrypt.str2ab(keyString);
			FCrypt.importKey(keyBuffer)
			.then(key => {
				//console.log(key);
				var keyString = FCrypt.ab2str(data);
				console.log(keyString);
			})

		})
		.catch(err => {
			console.error(err);
		})
	})
	.catch(err => {
		console.error(err);
	})
}*/
var logs = document.getElementById('logs'),
    errorlogs = document.getElementById('errorlogs'),
    output = document.getElementById('output'),
    btns = document.getElementById('btns');
var tests = {};
function Log(msg) {
	logs.innerText += msg;
	console.info(msg);
}
function Loge(msg) {
	errorlogs.innerText += msg;
	console.error(msg);
}
function Logo(msg) {
	output.innerText += msg;
	console.log(msg);
}
function Test(name, test, q) {
	this.test = test;
	this.q = q;
	this.name = name;
	this.start = function () {
		tests[this.name] = this.test;
		if (!this.q.done()) this.q.next();else generateButtons();
	};
}
function TestQueue() {
	this.q = [];
	this.add = function (test) {
		this.q.push(test);
	};
	this.next = function () {
		this.q.shift().start();
	};
	this.done = function () {
		return !this.q.length;
	};
}
var queue = new TestQueue();
queue.add(new Test('generateKey', function () {
	return new Promise(function (resolve, reject) {
		_index2.default.generateKey().then(function (key) {
			if (key == undefined || key == null) {
				Loge('[generateKey] key is undefined or null');
			} else if (!key instanceof CryptoKey) {
				Loge('[generateKey] key is not a CryptoKey');
			} else {
				Logo('[generateKey] generateKey successful');
			}
			resolve();
		}).catch(function (err) {
			Loge(err);
			resolve();
		});
	});
}, queue));
queue.add(new Test('exportKey', function () {
	return new Promise(function (resolve, reject) {
		_index2.default.generateKey().then(function (key) {
			_index2.default.exportKey(key).then(function (data) {
				if (key == undefined || key == null) {
					Loge('[exportKey] key is undefined or null');
				} else if (!key instanceof Object) {
					Loge('[exportKey] key is not an ArrayBuffer');
				} else {
					Logo('[exportKey] exportKey successful');
				}
				resolve();
			}).catch(function (err) {
				Loge(err);
				resolve();
			});
		}).catch(function (err) {
			Loge(err);
			resolve();
		});
	});
}, queue));
queue.add(new Test('importKey', function () {
	return new Promise(function (resolve, reject) {
		_index2.default.generateKey().then(function (key) {
			_index2.default.exportKey(key).then(function (data) {
				_index2.default.importKey(data).then(function (nkey) {
					if (nkey == undefined || nkey == null) {
						Loge('[importKey] key is undefined or null');
					} else if (!nkey instanceof CryptoKey) {
						Loge('[importKey] key is not an ArrayBuffer');
					} else {
						Logo('[importKey] importKey successful');
					}
					resolve();
				});
			}).catch(function (err) {
				Loge(err);
				resolve();
			});
		}).catch(function (err) {
			Loge(err);
			resolve();
		});
	});
}, queue));
queue.add(new Test('ab2str', function () {
	return new Promise(function (resolve, reject) {
		_index2.default.generateKey().then(function (key) {
			_index2.default.exportKey(key).then(function (data) {
				var keyString = _index2.default.ab2str(data);
				if (typeof keyString !== 'string') {
					Loge('[ab2str] keyString is not a string');
					resolve();
				}
				var keyBuffer = _index2.default.str2ab(keyString);
				if (keyString != _index2.default.ab2str(keyBuffer)) {
					Loge("[str2ab] buffer does not match original exported key");
				} else {
					Logo('[ab2str] ab2str and str2ab successful');
				}
				resolve();
			}).catch(function (err) {
				Loge(err);
				resolve();
			});
		}).catch(function (err) {
			Loge(err);
			resolve();
		});
	});
}, queue));
queue.add(new Test('encrypt', function () {
	return new Promise(function (resolve, reject) {
		_index2.default.generateKey().then(function (key) {
			var arr = new Uint32Array(100);
			window.crypto.getRandomValues(arr);
			//console.log([...arr]);
			var file = new Blob([arr]);
			_index2.default.encrypt(key, file).then(function (res) {
				var result = res.result,
				    iv = res.iv;


				if (iv.buffer == undefined || iv.buffer == null) {
					Loge('[encrypt] iv is undefined or null');
				} else if (result == undefined || result == null) {
					Loge('[encrypt] result is undefined or null');
				} else if (!iv.buffer instanceof ArrayBuffer || !result instanceof ArrayBuffer) {
					Loge('[encrypt] iv or result is not ArrayBuffer');
				} else {
					Logo('[encrypt] encrypt successful');
				}
				resolve();
			}).catch(function (err) {
				Loge(err);
				resolve();
			});
		}).catch(function (err) {
			Loge(err);
			resolve();
		});
	});
}, queue));
queue.add(new Test('decrypt', function () {
	var original = 'The quick brown fox jumps over the lazy dog.';
	return new Promise(function (resolve, reject) {
		_index2.default.generateKey().then(function (key) {
			var file = new Blob([original], { type: "text/plain" });
			_index2.default.encrypt(key, file).then(function (res) {
				var result = res.result,
				    iv = res.iv;


				_index2.default.decrypt(key, iv, result).then(function (buf) {

					var dec = String.fromCharCode.apply(String, _toConsumableArray(new Uint8Array(buf)));
					if (buf == null || buf == undefined) {
						Loge('[decrypt] buffer is undefined or null');
					} else if (!buf instanceof ArrayBuffer) {
						Loge('[decrypt] iv or result is not ArrayBuffer');
					} else if (dec != original) {
						Loge('[decrypt] decrypted is not same as original');
					} else {
						Logo('[decrypt] decrypt successful');
					}
					resolve();
				});
			}).catch(function (err) {
				Loge(err);
				resolve();
			});
		}).catch(function (err) {
			Loge(err);
			resolve();
		});
	});
}, queue));

queue.next();

function generateButtons() {
	var _loop = function _loop(test) {
		btn = document.createElement('button');

		btn.innerText = 'run ' + test;
		btn.id = test;
		btn.addEventListener('click', function (e) {
			var t = tests[test];
			logs.innerHTML = '';
			errorlogs.innerHTML = '';
			output.innerHTML = '';
			t().then(function (res) {});
		});
		btns.append(btn);
	};

	for (var test in tests) {
		var btn;

		_loop(test);
	}
}

/***/ })
/******/ ]);