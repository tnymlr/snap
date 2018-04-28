const Lang = require('lang')
const Gtk = require('gi/gtk')
const Gio = require('gi/gio')
const GObject = require('gi/gobject')

const settings = require('settings')

const apps = require('utils/apps')

module.exports.Apps = new Lang.Class({
  Name: 'Snap.Widgets.Combos.Apps',
  GTypeName: 'SnapWidgetsCombosApp',

  _init: function (builder, window, shortcut = null) {
    this.window = window
    this.model = this.initAppModel(builder)
    this.combo = this.initAppCombo(builder, this.model, shortcut)
  },

  initAppCombo: function (builder, model, shortcut) {
    const combo = builder.get_object('shortcut-app-combo')

    combo.set_model(model)

    const iconRenderer = new Gtk.CellRendererPixbuf()
    const textRenderer = new Gtk.CellRendererText()

    combo.pack_start(iconRenderer, false)
    combo.pack_end(textRenderer, false)

    combo.add_attribute(iconRenderer, 'gicon', 1)
    combo.add_attribute(textRenderer, 'text', 2)

    if (shortcut) {
      combo.set_active_id(shortcut.id)
    } else {
      combo.set_active(0)
    }

    this.comboHandler = combo.connect('changed', Lang.bind(this, this.onComboChange))

    return combo
  },

  initAppModel: function (builder) {
    const model = new Gtk.ListStore()
    model.set_column_types([
      GObject.TYPE_STRING,
      Gio.Icon,
      GObject.TYPE_STRING])

    apps.all().forEach((app) => {
      if (app.icon && app.name && app.name.length > 0) {
        const iter = model.append()
        model.set(iter, [0], [app.id])
        model.set(iter, [1], [app.icon])
        model.set(iter, [2], [app.name])
      }
    })

    return model
  },

  onComboChange: function () {
    const app = apps.forId(this.activeId)

    const shortcut = settings.get(this.activeId)
    shortcut.name = app.name
    shortcut.exec = app.commandline
  },

  get activeId () {
    return this.combo.get_active_id()
  }
})
