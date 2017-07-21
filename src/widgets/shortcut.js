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

const Events = {
	DELETED: 'deleted',
	SHORTCUT_INPUT: 'shortcut-input',
	SHORTCUT_ERASED: 'shortcut-erased'
}

const EventHandler = new Lang.Class({
	Name: 'Snap.Shortcut.Widget.Event.Handler',
	GTypeName: 'SnapShortcutWidgetEventHandler',

	_init: function(widget) {
		this.widget = widget
	},

	deleteButtonClicked: function() {
		this.widget.emit(Events.DELETED, widget)
	},

	entryKeyPressed: function(entry, event) {
		const result = shortcut(event.get_state(), event.get_keyval())

		if(result.valid) {
			entry.set_text(result.string)
			this.widget.emit(Events.SHORTCUT_INPUT, result.string)
		} else if(result.string === '<BackSpace>') {
			const erased = entry.get_text()
			entry.set_text('')
			log('Erased shortcut!')
			this.widget.emit(Events.SHORTCUT_ERASED, erased)
		} else {
			log("Invalid shortcut: {}", result.string)
		}

		entry.vfunc_move_cursor(
			Gtk.MovementStep.LOGICAL_POSITIONS,
			entry.get_text_length(),
			false)
	},

	entryKeyReleased: function(entry, event) {
	}
})

const SnapShortcutWidget = new Lang.Class({
	Name: 'Snap.Shortcut.Widget',
	GTypeName: 'SnapShortcutWidget',
	Extends: Gtk.ListBoxRow,
	Signals: { //those must be linked with Events structur up there
		'deleted': {
			param_types: [ Gtk.ListBoxRow ]
		},
		'shortcut-input': {
			param_types: [ GObject.String ]
		},
		'shortcut-erased': {
			param_types: [ GObject.String ]
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
		const entry = builder.get_object('shortcut-entry')
		entry.connect('key-press-event', Lang.bind(handler, handler.entryKeyPressed))
		entry.connect('key-release-event', Lang.bind(handler, handler.entryKeyReleased))

		return entry
	},
})

module.exports.Widget = SnapShortcutWidget
module.exports.events = Events
