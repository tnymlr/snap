const settings = require('./settings')
const ShortcutWidget = require('./shortcut')

module.exports = {
  settings: settings.create(),
  ShortcutWidget: ShortcutWidget
}
