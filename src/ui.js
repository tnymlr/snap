const Lang = require('lang')
const GObject = require('gi/gobject')
const Gtk = require('gi/gtk')
const me = require('me')
const log = require('utils/log')
const format = require('string-format')

const DIR = me.dir.get_path()
const UI = {
	settings: format('{}/{}', DIR, '/data/snap-settings.glade'),
	shortcut: format('{}/{}', DIR, '/data/snap-shortcut.glade')
}

const SnapShortcutWidget = new GObject.Class({
	Name: 'Snap.Prefs.ShortcutWidget',
	GTypeName: 'SnapShortcutWidget',
	Extends: Gtk.Box,

	_init: function(params) {
		this.parent(params)
		this.builder = new Gtk.Builder()

		this.initWindow()
	},

	initWindow: function() {
		this.builder.add_from_file(UI.shortcut)
		this.mainWidget = this.builder.get_object('shortcut-box')
		this.mainWidget.show_all()
	}
})

const SnapWidget = new GObject.Class({
	Name: 'Snap.Prefs.Widget',
	GTypeName: 'SnapWidget',
	Extends: Gtk.Box,

	_init: function(params) {
		this.parent(params)
		this.builder = new Gtk.Builder()
		this.shorcuts = []

		this.initWindow()
	},

	initWindow: function() {
		this.builder.add_from_file(UI.settings)
		this.mainWidget = this.builder.get_object('settings-box')
		this.addButton = this.builder.get_object('settings-add-button')
		this.shortcutsList = this.builder.get_object('shortcuts-list')

		this.addButton.connect('clicked', Lang.bind(this, this.addShortcut))
	},

	addShortcut: function(){
		log('"Add" button clicked!')
		
		let shortcut = new SnapShortcutWidget()
		
		this.shortcutsList.insert(shortcut.mainWidget, -1)

		this.shorcuts.push(shortcut)

		log('"Add" button click proccessed')
	}
})

const SnapUi = new Lang.Class({
	Name: 'SnapUi',

	_init: function(){
		this.settings = new SnapWidget()
	},

	get widget(){
		let widget = this.settings.mainWidget
		widget.show_all()
		return widget
	}
});

module.exports = new SnapUi()

