const Lang = require('lang')

const log = require('utils/log')

const factory = require('./factory')

module.exports = factory.create('apply', (window) => {
	log('Applying...')
})
