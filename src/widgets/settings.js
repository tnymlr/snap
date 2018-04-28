const Lang = require('lang')
const Gtk = require('gi/gtk')

const data = require('utils/data')

const settings = require('settings')

const buttons = require('./buttons')
const shortcut = require('./shortcut')

module.exports = new Lang.Class({
  Name: 'Snap.Widgets.Settings',
  GTypeName: 'SnapWidgetsSettings',
  Extends: Gtk.Box,

  _init: function (params) {
    this.parent(params)

    this.hexpand = true
    this.vexpand = true
    this.hexpand_set = true
    this.vexpand_set = true
    this.halign = Gtk.Align.FILL
    this.valign = Gtk.Align.FILL

    this.builder = this.initBuilder()

    this.mainWidget = this.initMainWidget(this.builder)
    this.shortcuts = this.initShortcuts(this.builder)
    this.addButton = new buttons.Add(this.builder, this)
    this.applyButton = new buttons.Apply(this.builder, this)
    this.initSettings()
  },

  initBuilder: function () {
    const builder = new Gtk.Builder()
    builder.add_from_file(data.glade('snap-settings'))
    return builder
  },

  initMainWidget: function (builder) {
    const widget = builder.get_object('settings-box')
    this.add(widget)
    return widget
  },

  initShortcuts: function (builder) {
    const list = builder.get_object('shortcuts-list')
    return list
  },

  initSettings: function () {
    settings.all.forEach((item) => {
      const widget = new shortcut.Widget(this, item)
      this.shortcuts.insert(widget, -1)
    })
  }
})
