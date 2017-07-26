const controller = require('widgets/controller')

const factory = require('./factory')

module.exports = factory.create('shortcut', 'delete', (window) => {
	window.widget.shortcuts.remove(window)
    controller.emit(controller.events.SHORTCUT_DELETED, window)
})
