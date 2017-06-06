function ab2str(b) {
    return btoa64(String.fromCharCode(...new Uint16Array(b)));
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
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.addEventListener('loadend', () => {
            resolve(reader.result);
        });
        reader.readAsArrayBuffer(file);
    });
}

function ab2file(ab) {
    return new File([ab], Date.now().toString(), {type: "application/octet-stream"});
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
        iv,
        data,
    }
}

function btoa64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}
function atob64(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

export {
    ab2str,
    str2ab,
    file2ab,
    ab2file,
    mergeIvAndData,
    splitIvAndData,
};