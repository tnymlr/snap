const log = require('utils/log')
const keys = require('keys')

const windows = require('windows')

const Main = require('ui/main')
const Lang = require('lang')

const settings = require('settings')

const manager =  new keys.KeyManager()
const KeyController = new Lang.Class({
	Name: 'SnapKeyController',

	_init: function() {
	},

	setupKeys: function(keys){
		log('Received settings! Setting up listeners for keys...')
		for(let shortcut of keys) {
			const key = shortcut.key
			const app = shortcut.app

			manager.startListenFor(key, function(key) {
				windows.Manager.getWindows().forEach((w) => {
					const wmClass = w.wmClass.toLowerCase()

					if(app.toLowerCase().indexOf(wmClass) >= 0) {
						w.raise()
					}
				})
			})
		}
		log('Done setting up listeners for keys!')
	},

	disableKeys: function(){
		manager.stopListenForAll()
	}
})

const MenuController = new Lang.Class({
	Name: 'SnapMenuController',

	_init: function(panel) {
		this._menu = null
	},

	get menu() {
		return this._menu
	},

	setupMenu: function() {
		this._menu = new Menu()

		windows.Manager.getWindows().forEach((w) => {
			let title = w.title

			if(!title || title.length < 1) {
				title = w.wmClass
			} else {
				title += " : " + w.wmClass
			}

			this._menu.addDynamicItem(
				title,
				'system-run-symbolic',
				function (menuItem, event) {
					w.raise()
				})
		})
	},

	cleanMenu: function() {
		if(this._menu) {
			this._menu.destroy()
			this._menu = null
		}
	},
})

const SnapExtension = new Lang.Class({
	Name: 'SnapExtension',

	_init: function(){
		this.keyController = new KeyController()
	},

	enable: function(){
		log('Enabling...')

		log('Loading shortcuts from settings...')
		const shortcuts = settings.all.map((item) => {
			const shortcut = {key: item.key, app: item.name}
			log('Got shortcut [key={}, app={}]', shortcut.key, shortcut.app)
			return shortcut
		})
		log('Done loading shortcuts from settings!')
		this.keyController.setupKeys(shortcuts)
	},

	disable: function(){
		log('Disabling...')
		this.keyController.disableKeys()
	}
})

module.exports = new SnapExtension()

