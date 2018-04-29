const log = require('utils/log')

const windows = require('windows')

const Lang = require('lang')

const keys = require('keys')
  .create()
const settings = require('settings')
  .create()

const KeyController = new Lang.Class({
  Name: 'SnapKeyController',

  _init: function () {
  },

  setupKeys: function (shortcuts) {
    log('Received settings! Setting up listeners for keys...')
    for (let shortcut of shortcuts) {
      const key = shortcut.key
      const app = shortcut.app

      keys.onKey(key).do((key) => {
        // we take all the windows
        windows.Manager.getWindows().map((w) => {
          const wmClass = w.wmClass.toLowerCase()

          // and we take the app and count how much words in the name
          // of an app we can find in window class.
          // this is 'weight' of our window
          const window = {
            weight: app.toLowerCase()
              .split(' ')
              .filter((word) => wmClass.indexOf(word) >= 0)
              .length,
            window: w
          }
          return window
        }).sort((a, b) => { // windows with bigger weight go to the top.
          return a.weight < b.weight
            ? -1
            : a.weight > b.weight
              ? 1
              : 0
        }).reverse().reduce((col, val) => { // and we take only windows with largest weight
          if (col.length < 1 || col[col.length - 1].weight === val.weight) {
            return col.concat([val])
          }

          return col
        }, []).forEach((item) => { // bring it on
          item.window.raise()
        })
      })
    }
    log('Done setting up listeners for keys!')
  }
})

const SnapExtension = new Lang.Class({
  Name: 'SnapExtension',

  _init: function () {
    this.keyController = new KeyController()
  },

  enable: function () {
    log('Enabling...')

    log('Starting key manager...')
    keys.start()
    log('Key manager has started')

    log('Starting settings reader...')
    settings.start()
    log('Settings reader has started')

    log('Loading shortcuts from settings...')
    const shortcuts = settings.shortcuts.map((item) => {
      const shortcut = {key: item.key, app: item.name}
      log('Got shortcut [key={}, app={}]', shortcut.key, shortcut.app)
      return shortcut
    })
    log('Done loading shortcuts from settings!')
    this.keyController.setupKeys(shortcuts)

    log('Enabled!')
  },

  disable: function () {
    log('Disabling...')

    log('Stopping key manager...')
    keys.stop()
    log('Key manager has stopped')

    log('Stopping settings reader')
    settings.stop()
    log('Settings reader has stopped')

    log('Disabled!')
  }
})

module.exports = new SnapExtension()
