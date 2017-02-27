const Lang = require('lang')
const Meta = require('gi/meta')

let actors = new WeakMap()
let windows = new WeakMap()


module.exports = new Lang.Class({
	Name: 'Window',

	_init: function(actor) {
		actors.set(this, actor)
		windows.set(this, actor.meta_window)
	},

	hide: function() {
		this.actor.hide()
	},

	show: function() {
		this.actor.show()
	},

	raise: function () {
		this.actor.raise_top()
		this.window.activate(0)
	},

	get actor() {
		return actors.get(this)
	},

	get window() {
		return windows.get(this)
	},

	get title() {
		return this.window.title
	},

	get pid() {
		return this.window.pid
	},

	get wmClass() {
		return this.window.wm_class
	},

	get type() {
		return this.window.window_type
	},

	get isNormal() {
		return this.type == Meta.WindowType.NORMAL
	}
})

