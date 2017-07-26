const shortcut = require('widgets/shortcut')
const controller = require('widgets/controller')

const factory = require('./factory')

module.exports = factory.create('add', (window) => {
	const widget = new shortcut.Widget(window)
	window.shortcuts.insert(widget, -1)
	controller.emit(controller.events.SHORTCUT_ADDED, widget)
})
