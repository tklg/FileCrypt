import FCrypt from './FCrypt.js';
import FileSaver from 'file-saver';
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
}
