import FileCrypt from './../../src/js/index.js';

const logs = document.getElementById('logs'),
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
	this.start = function() {
		//tests[this.name] = this.test;
		if (!this.q.done()) this.q.next();
		//else generateButtons();
	}
}
function TestQueue() {
	this.q = [];
	this.add = function(test) {
		this.q.push(test);
		tests[test.name] = test.test;
	}
	this.next = function() {
		this.q.shift().start();
	}
	this.done = function() {
		return !this.q.length;
	}
}
var queue = new TestQueue();
queue.add(new Test('generateKey', function() {
	return new Promise((resolve, reject) => {
		FileCrypt.generateKey()
		.then(key => {
			if (key == undefined || key == null) {
				Loge('[generateKey] key is undefined or null');
			} else if (!key instanceof CryptoKey) {
				Loge('[generateKey] key is not a CryptoKey');
			} else {
				Logo('[generateKey] generateKey successful');
			}
			resolve();
		})
		.catch(err => {
			Loge(err);
			resolve();
		});	
	})
}, queue));
queue.add(new Test('exportKey', function() {
	return new Promise((resolve, reject) => {
		FileCrypt.generateKey()
		.then(key => {
			FileCrypt.exportKey(key)
			.then(data => {
				if (key == undefined || key == null) {
					Loge('[exportKey] key is undefined or null');
				} else if (!key instanceof Object) {
					Loge('[exportKey] key is not an ArrayBuffer');
				} else {
					Logo('[exportKey] exportKey successful');
				}
				resolve();
			})
			.catch(err => {
				Loge(err);
				resolve();
			})
		})
		.catch(err => {
			Loge(err);
			resolve();
		});	
	})
}, queue));
queue.add(new Test('importKey', function() {
	return new Promise((resolve, reject) => {
		FileCrypt.generateKey()
		.then(key => {
			FileCrypt.exportKey(key)
			.then(data => {
				FileCrypt.importKey(data)
				.then(nkey => {
					if (nkey == undefined || nkey == null) {
						Loge('[importKey] key is undefined or null');
					} else if (!nkey instanceof CryptoKey) {
						Loge('[importKey] key is not an ArrayBuffer');
					} else {
						Logo('[importKey] importKey successful');
					}
					resolve();
				})
			})
			.catch(err => {
				Loge(err);
				resolve();
			})
		})
		.catch(err => {
			Loge(err);
			resolve();
		});	
	})
}, queue));
queue.add(new Test('ab2str', function() {
	return new Promise((resolve, reject) => {
		FileCrypt.generateKey()
		.then(key => {
			FileCrypt.exportKey(key)
			.then(data => {
				var keyString = FileCrypt.ab2str(data);
				if (typeof keyString !== 'string') {
					Loge('[ab2str] keyString is not a string');
					resolve();
				}
				var keyBuffer = FileCrypt.str2ab(keyString);
				if (keyString != FileCrypt.ab2str(keyBuffer)) {
					Loge("[str2ab] buffer does not match original exported key");
				} else {
					Logo('[ab2str] ab2str and str2ab successful');
				}
				resolve();
			})
			.catch(err => {
				Loge(err);
				resolve();
			})
		})
		.catch(err => {
			Loge(err);
			resolve();
		});	
	})
}, queue));
queue.add(new Test('encrypt', function() {
	return new Promise((resolve, reject) => {
		FileCrypt.generateKey()
		.then(key => {
			var arr = new Uint32Array(100);
			window.crypto.getRandomValues(arr);
			//console.log([...arr]);
			var file = new Blob([arr]);
			FileCrypt.encrypt(key, file)
				.then(res => {
				let {result, iv} = res;

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
			})
			.catch(err => {
				Loge(err);
				resolve();
			})
		})
		.catch(err => {
			Loge(err);
			resolve();
		});	
	})
}, queue));
queue.add(new Test('decrypt', function() {
	let original = 'The quick brown fox jumps over the lazy dog.';
	return new Promise((resolve, reject) => {
		FileCrypt.generateKey()
		.then(key => {
			var file = new Blob([original], {type: "text/plain"});
			FileCrypt.encrypt(key, file)
				.then(res => {
				let {result, iv} = res;

				FileCrypt.decrypt(key, iv, result)
				.then(buf => {

					var dec = String.fromCharCode(...new Uint8Array(buf));
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
				})
			})
			.catch(err => {
				Loge(err);
				resolve();
			})
		})
		.catch(err => {
			Loge(err);
			resolve();
		});	
	})
}, queue));
queue.add(new Test('importPassword', function() {
	return new Promise((resolve, reject) => {
		Log('[importPassword] generating key from password "password1"');
		FileCrypt.importPassword('password1')
		.then(key => {
			if (key == undefined || key == null) {
				Loge('[importPassword] key is undefined or null');
			} else if (!key instanceof CryptoKey) {
				Loge('[importPassword] key is not a CryptoKey');
			} else {
				Logo('[importPassword] generateKey successful');
			}
			resolve();
		})
		.catch(err => {
			Loge(err);
			resolve();
		});	
	})
}, queue));

generateButtons();
queue.next();

function generateButtons() {
	for (let test in tests) {
		var btn = document.createElement('button');
		btn.innerText = 'run ' + test;
		btn.id = test;
		btn.addEventListener('click', function(e) {
			var t = tests[test];
			logs.innerHTML = '';
			errorlogs.innerHTML = '';
			output.innerHTML = '';
			t().then(res => {

			})
		});
		btns.append(btn);
	}
}