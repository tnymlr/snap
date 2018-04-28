const Lang = require('lang')
const widgets = require('widgets')

const SnapWidget = new Lang.Class({
  Name: 'SnapWidget',

  _init: function () {
    this.settings = new widgets.SettingsWidget()
  },

  get widget () {
    this.settings.show_all()
    return this.settings
  }
})

module.exports = new SnapWidget()
