const format = require('string-format')

module.exports = function() {
	let args = Array.prototype.slice.call(arguments)
	let msg = format('[Snap] {}', format.apply(null, args))

	global.log(msg)
}
