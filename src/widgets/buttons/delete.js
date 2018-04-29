const settings = require('settings')

const factory = require('./factory')

const log = require('utils/log')

module.exports = factory.create('shortcut', 'delete', (window) => {
  const id = window.apps.activeId || window.id

  window.widget.shortcuts.remove(window)

  log('Delete button clicked [activeId={}]', window.apps.activeId)

  settings.get(id)
    .delete()
})
