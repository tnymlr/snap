const Lang = require('lang')

const format = require('string-format')
const log = require('utils/log')

const capitalize = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports.create = function () {
  const args = Array.prototype.slice.call(arguments)

  let name = ''
  let object = ''
  let onClick = null
  if (args.length === 2) {
    name = args[0]
    object = format('settings-{}-button', name)
    onClick = args[1]
  } else if (args.length === 3) {
    name = args[1]
    object = format('{}-{}-button', args[0], name)
    onClick = args[2]
  }

  const capitalName = capitalize(name)

  return new Lang.Class({
    Name: 'Snap.Widgets.Settings.Buttons.' + capitalName,
    GTypeName: 'SnapWidgetsSettingsButtons' + capitalName,

    _init: function (builder, widget) {
      this.widget = widget
      this.button = this.initButton(builder)
    },

    initButton: function (builder) {
      log('Loading: {}', object)
      const button = builder.get_object(object)
      button.connect('clicked', Lang.bind(this, this.clicked))
      return button
    },

    clicked: function () {
      onClick(this.widget)
    }
  })
}
