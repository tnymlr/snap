const Lang = require('lang')
const GObject = require('gi/gobject')
const Gtk = require('gi/gtk')

const data = require('utils/data')

module.exports = new Lang.Class({
	Name: 'Snap.Shortcut.Widget',
	GTypeName: 'SnapShortcutWidget',
	Extends: Gtk.ListBoxRow,
	Signals: {
		'deleted': {
			param_types: [ Gtk.ListBoxRow ]
		}
	},

	_init: function() {
		this.parent({})
		this.builder = new Gtk.Builder()

		this.initWindow()
	},

	initWindow: function() {
		this.builder.add_from_file(data.glade('snap-shortcut'))
		this.mainWidget = this.builder.get_object('shortcut-box')
		this.deleteButton = this.builder.get_object('shortcut-delete-button')
		this.deleteButton.connect('clicked', Lang.bind(this, this.deleteButtonClicked))
		this.add(this.mainWidget)
		this.show_all()
	},

	deleteButtonClicked: function() {
		this.emit('deleted', this)
	}
})
