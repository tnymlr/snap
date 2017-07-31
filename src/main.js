const log = require('utils/log')
const keys = require('keys')

const Menu = require('menu')
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
//		this.menuController = new MenuController()
		this.keyController = new KeyController()
	},

	enable: function(){
//		this.menuController.setupMenu()
		const keys = settings.load().map((shortcut) => {
			return {key: shortcut.key, app: shortcut.name}
		})
		this.keyController.setupKeys(keys)
//		Main.panel.addToStatusArea('SnapMenu', this.menuController.menu)
	},

	disable: function(){
//		this.menuController.cleanMenu()
		this.keyController.disableKeys()
	}
})

module.exports = new SnapExtension()

