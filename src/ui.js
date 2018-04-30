const Lang = require('lang')
const widgets = require('widgets')

const SnapWidget = new Lang.Class({
  Name: 'SnapWidget',

  _init: function () {
    this.settings = widgets.settings;
    this.settings.start()
  },

  get widget () {
    this.settings.widget.show_all()
    return this.settings.widget
  }
})

module.exports = new SnapWidget()
