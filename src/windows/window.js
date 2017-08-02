const Lang = require('lang')
const Meta = require('gi/meta')

let actors = new WeakMap()
let windows = new WeakMap()


module.exports = new Lang.Class({
	Name: 'Window',

	_init(actor) {
		actors.set(this, actor)
		windows.set(this, actor.meta_window)
	},

	hide() {
		this.actor.hide()
	},

	show() {
		this.actor.show()
	},

	raise () {
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

