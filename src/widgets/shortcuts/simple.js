const Lang = require('lang')
const Gtk = require('gi/gtk')

const settings = require('settings')
const shortcut = require('keys/shortcut')
const data = require('utils/data')
const log = require('utils/log')

const buttons = require('../buttons')
const combos = require('../combos')

module.exports.Widget = new Lang.Class({
  Name: 'Snap.Shortcut.Simple.Widget',
  GTypeName: 'SnapShortcutSimpleWidget',
  Extends: Gtk.ListBoxRow,

  _init: function (widget, shortcut = null) {
    this.parent({})

    this.widget = widget
    this.builder = this.initBuilder()
    this.mainWidget = this.initMainWidget(this.builder)
    this.apps = new combos.Apps(this.builder, this, shortcut)
    this.deleteButton = new buttons.Delete(this.builder, this)
    this.entry = this.initEntry(this.builder, shortcut)

    this.add(this.mainWidget)
    this.show_all()
  },

  initBuilder: function () {
    log('Preparing UI builder...')
    const builder = new Gtk.Builder()
    builder.add_from_file(data.glade('snap-shortcut'))

    return builder
  },

  initMainWidget: function (builder) {
    log('Preparing main widget...')
    const mainWidget = builder.get_object('shortcut-box')
    return mainWidget
  },

  initEntry: function (builder, shortcut) {
    const entry = builder.get_object('shortcut-entry')
    if (shortcut) {
      this.id = shortcut.id
      this.updateEntry(entry, shortcut.key)
    }
    entry.connect('key-press-event', Lang.bind(this, this.entryKeyPressed))

    return entry
  },

  entryKeyPressed: function (entry, event) {
    const result = shortcut(event.get_state(), event.get_keyval())

    if (result.valid) {
      if (result.string === 'BackSpace') {
        result.string = ''
      }

      this.updateEntry(entry, result.string)
      settings.get(this.apps.activeId).key = result.string
    }
  },

  updateEntry: function (entry, value) {
    entry.set_text(value)
    entry.vfunc_move_cursor(
      Gtk.MovementStep.LOGICAL_POSITIONS,
      entry.get_text_length(),
      false)
  }
})
