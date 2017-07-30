const Lang = require('lang')
const GObject = require('gi/gobject')
const Gtk = require('gi/gtk')
const Gdk = require('gi/gdk')

const shortcut = require('keys/shortcut')
const data = require('utils/data')
const controller = require('widgets/controller')
const log = require('utils/log')

const buttons = require('./buttons')
const combos = require('./combos')

const SnapShortcutWidget = new Lang.Class({
	Name: 'Snap.Shortcut.Widget',
	GTypeName: 'SnapShortcutWidget',
	Extends: Gtk.ListBoxRow,

	_init: function(widget) {
		this.parent({})

        this.widget = widget
		this.keymap = this.initKeymap()
		this.builder = this.initBuilder()
		this.mainWidget = this.initMainWidget(this.builder)
		this.apps = new combos.Apps(this.builder, this)
		this.deleteButton = new buttons.Delete(this.builder, this)
		this.entry = this.initEntry(this.builder)

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

	initEntry: function(builder){
		const entry = builder.get_object('shortcut-entry')
		entry.connect('key-press-event', Lang.bind(this, this.entryKeyPressed))

		return entry
	},

	entryKeyPressed: function(entry, event) {
		const result = shortcut(event.get_state(), event.get_keyval())

		if(result.valid) {
			entry.set_text(result.string)
			controller.emit(controller.events.SHORTCUT_INPUT, this, result.string)
		} else if(result.string === 'BackSpace') {
			const erased = entry.get_text()
			entry.set_text('')
			log('Erased shortcut!')
			controller.emit(controller.events.SHORTCUT_ERASED, this, result.string)
		} else {
			log("Invalid shortcut: {}", result.string)
		}

		entry.vfunc_move_cursor(
			Gtk.MovementStep.LOGICAL_POSITIONS,
			entry.get_text_length(),
			false)
	}
})

module.exports.Widget = SnapShortcutWidget
