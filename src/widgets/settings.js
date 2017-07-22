const Lang = require('lang')
const GObject = require('gi/gobject')
const Gtk = require('gi/gtk')

const data = require('utils/data')
const settings = require('settings')

const shortcut = require('./shortcut')

module.exports = new Lang.Class({
	Name: 'Snap.Settings.Widget',
	GTypeName: 'SnapSettingsWidget',
	Extends: Gtk.Box,

	_init: function(params) {
		this.parent(params)

		this.hexpand = true
		this.vexpand = true
		this.hexpand_set = true
		this.vexpand_set = true
		this.halign = Gtk.Align.FILL
		this.valign = Gtk.Align.FILL

		this.builder = new Gtk.Builder()
		this.builder.add_from_file(data.glade('snap-settings'))

		this.mainWidget = this.builder.get_object('settings-box')
		this.shortcutsList = this.builder.get_object('shortcuts-list')
		this.addButton = this.builder.get_object('settings-add-button')
		this.applyButton = this.initApplyButton(this.builder)
		this.addButton.connect('clicked', Lang.bind(this, this.addShortcut))

		this.add(this.mainWidget)
	},

	initApplyButton: function(builder) {
		const button = builder.get_object('settings-save-button')
		button.connect('clicked', Lang.bind(this, this.applyButtonClicked))
		return button
	},

	applyButtonClicked: function() {
		settings()
	},

	addShortcut: function(){
		const widget = new shortcut.Widget()
		widget.connect(shortcut.events.DELETED,
			Lang.bind(this, this.deleteShortcut))
		this.shortcutsList.insert(widget, -1)
	},

	deleteShortcut: function(widget) {
		this.shortcutsList.remove(widget)
	}
})
