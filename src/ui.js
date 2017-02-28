const Lang = require('lang')
const GObject = require('gi/gobject')
const Gtk = require('gi/gtk')
const me = require('me')

const SnapWidget = new GObject.Class({
	Name: 'Snap.Prefs.Widget',
	GTypeName: 'SnapWidget',
	Extends: Gtk.Box,

	_init: function(params) {
		this.parent(params)

		this.initWindow()
	},

	Window: new Gtk.Builder(),

	get dir() {
		return me.dir.get_path()
	},

	get ui() {
		return this.dir + '/data/snap-settings.glade'
	},

	initWindow: function() {
		this.Window.add_from_file(this.ui)
		this.mainWidget = this.Window.get_object('settings-box')
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

