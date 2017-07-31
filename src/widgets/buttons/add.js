const shortcut = require('widgets/shortcut')

const factory = require('./factory')

module.exports = factory.create('add', (window) => {
	const widget = new shortcut.Widget(window)
	window.shortcuts.insert(widget, -1)
})
