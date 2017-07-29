const shortcut = require('widgets/shortcut')
const controller = require('widgets/controller')

const apps = require('utils/apps')

const factory = require('./factory')

module.exports = factory.create('add', (window) => {
	const widget = new shortcut.Widget(window)
	window.shortcuts.insert(widget, -1)

	const id = widget.apps.combo.get_active_id()
	const app = apps.forId(id)
	controller.emit(controller.events.SHORTCUT_ADDED, widget, app)
})
