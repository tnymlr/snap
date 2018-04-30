const me = require('me')

const format = require('string-format')

const DIR = me.dir.get_path()

module.exports.root = DIR
module.exports.dir = format('{}/{}', DIR, 'data')
module.exports.glade = function (name) {
  return format('{}/{}/{}.{}', DIR, 'data', name, 'glade')
}
