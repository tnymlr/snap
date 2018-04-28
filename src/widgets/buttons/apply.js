const settings = require('settings')
const factory = require('./factory')

module.exports = factory.create('apply', (window) => {
  settings.save()
})
