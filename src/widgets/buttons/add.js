const Lang = require('lang')

const shortcut = require('widgets/shortcut')

const factory = require('./factory')

module.exports = factory.create('add', (window) => {
	const widget = new shortcut.Widget()
	widget.connect(shortcut.events.DELETED,
		Lang.bind(window, window.deleteShortcut))

	window.shortcutsList.insert(widget, -1)
})
