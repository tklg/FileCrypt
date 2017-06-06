const subtleCrypto = window.crypto.subtle;
const defaultAuthData = (new Uint8Array([213, 108, 109, 126, 31, 34, 62, 55, 223, 59, 205, 42])).buffer;

function encrypt(key, data, authData) {
	var iv = window.crypto.getRandomValues(new Uint8Array(12));
	var opts = [
	{
	 	name: "AES-GCM",
        iv: iv,
        additionalData: authData || defaultAuthData,
        tagLength: 128, //can be 32, 64, 96, 104, 112, 120 or 128 (default)
    },
    key,
    data,
    ];
    return new Promise((resolve, reject) => {
	    subtleCrypto.encrypt(...opts)
	    .then(result => {
	    	resolve({result, iv});
	    })
	    .catch(err => {
	    	reject(err);
	    })	
    })
}
function decrypt(key, iv, data, authData) {
	var opts = [
		{
	        name: "AES-GCM",
	        iv: iv,
	        additionalData: authData || defaultAuthData,
	        tagLength: 128,
	    },
	    key,
	    data
    ];
	return subtleCrypto.decrypt(...opts);
}
export {
	encrypt,
	decrypt,
}