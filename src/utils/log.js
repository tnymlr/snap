const format = require('string-format')
const gnome = require('gnome')

module.exports = function () {
  let args = Array.prototype.slice.call(arguments)
  let msg = format('[Snap] {}', format.apply(null, args))

  gnome.log(msg)
}
