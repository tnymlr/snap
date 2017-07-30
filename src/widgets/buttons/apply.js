const log = require('utils/log')
const controller = require('widgets/controller')

const factory = require('./factory')

module.exports = factory.create('apply', (window) => {
	controller.emit(controller.events.APPLY)
})
