module.exports = function wrapAsync(fn) {
	return new Promise(resolve => {
		fn.then(res => {
			resolve([undefined, res]);
		}).catch(err => {
			resolve([err]);
		})
	});
}
