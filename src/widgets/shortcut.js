const Lang = require('lang')
const GObject = require('gi/gobject')
const Gtk = require('gi/gtk')
const Gdk = require('gi/gdk')
const GLib = require('gi/glib')
const Clutter = require('gi/clutter')

const format = require('string-format')

const shortcut = require('keys/shortcut')
const data = require('utils/data')
const log = require('utils/log')

const EventHandler = new Lang.Class({
	Name: 'Snap.Shortcut.Widget.Event.Handler',
	GTypeName: 'SnapShortcutWidgetEventHandler',

	_init: function(widget) {
		this.widget = widget
	},

	deleteButtonClicked: function() {
		this.emit('deleted', widget)
	},

	entryKeyPressed: function(entry, event) {
		const result = shortcut(event.get_state(), event.get_keyval())

		if(result.valid) {
			log("Parsed shortcut: {}", result.string)
		} else {
			log("Invalid shortcut!")
		}
	},

	entryKeyReleased: function(entry, event) {
		//log("Got key release! [event={}, type={}, state={}, keyval={}]",
		//	event,
		//	event.get_event_type(),
		//	event.get_state(),
		//	event.get_keyval())

		//let state = event.get_state()[1]
		//let keyval = event.get_keyval()[1]
		//let name = Gdk.keyval_name(keyval)
		//log("Key: {}", name)
	}
})

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

		this.handler = new EventHandler(this)
		this.keymap = this.initKeymap()
		this.builder = this.initBuilder()
		this.mainWidget = this.initMainWidget(this.builder)
		this.deleteButton = this.initDeleteButton(this.builder, this.handler)
		this.entry = this.initEntry(this.builder, this.handler)

		this.add(this.mainWidget)
		this.show_all()
	},

	initKeymap: function() {
		log('Preparing keymap...')
		const display = Gdk.Display.get_default(0)
		const  keymap = Gdk.Keymap.get_for_display(display)

		return keymap
	},

	initBuilder: function(){
		log('Preparing UI builder...')
		const builder = new Gtk.Builder()
		builder.add_from_file(data.glade('snap-shortcut'))

		return builder
	},

	initMainWidget: function(builder){
		log('Preparing main widget...')
		const mainWidget = builder.get_object('shortcut-box')
		return mainWidget
	},

	initDeleteButton: function(builder, handler) {
		log('Preparing delete button...')
		const button = builder.get_object('shortcut-delete-button')
		button.connect('clicked', Lang.bind(handler, handler.deleteButtonClicked))

		return button
	},

	initEntry: function(builder, handler){
		let entry = builder.get_object('shortcut-entry')
		entry.connect('key-press-event', Lang.bind(handler, handler.entryKeyPressed))
		entry.connect('key-release-event', Lang.bind(handler, handler.entryKeyReleased))

		return entry
	}
})
