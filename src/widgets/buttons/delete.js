const settings = require('settings')

const factory = require('./factory')

module.exports = factory.create('shortcut', 'delete', (window) => {
	window.widget.shortcuts.remove(window)
	
	settings.get(window.apps.activeId)
		.delete()
})
