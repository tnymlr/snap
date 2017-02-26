const log = require('utils/log')
const keys = require('keys')

const Menu = require('menu')
const windows = require('windows')

const Main = imports.ui.main
const Lang = imports.lang

const KeyController = new Lang.Class({
	Name: 'SnapKeyController',

	_init: function() {
	},

	setupKeys: function(settings){
		this.manager = new keys.KeyManager()

		for(let [key, app] of settings.entries()) {
			this.manager.startListenFor(key, function(key) {
				windows.Manager.getWindows().forEach((w) => {
					let wmClass = w.wmClass.toLowerCase()

					if(wmClass.indexOf(app.toLowerCase()) >= 0) {
						w.raise()
					}
				})
			})
		}
	},

	disableKeys: function(){
		this.manager.stopListenForAll()
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

	enable: function(settings){
//		this.menuController.setupMenu()
		this.keyController.setupKeys(settings)
//		Main.panel.addToStatusArea('SnapMenu', this.menuController.menu)
	},

	disable: function(){
//		this.menuController.cleanMenu()
		this.keyController.disableKeys()
	}
})

global.SnapExtension = new SnapExtension()
