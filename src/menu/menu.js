const MenuItem = require('menu/item')
const log = require('utils/log')

const PanelMenu = imports.ui.panelMenu
const Lang = imports.lang
const Atk = imports.gi.Atk
const St = imports.gi.St

module.exports = new Lang.Class({
	Name: 'SnapMenu',
	Extends: PanelMenu.Button,

	_init: function(callback) {
		this.parent(null, 'SnapMenu')
		this.actor.accessible_role = Atk.Role.TOGGLE_BUTTON
		
		this._icon = new St.Icon({
			icon_name: 'system-run-symbolic',
			style_class: 'system-status-icon'
		})
		this.actor.add_actor(this._icon)
		this.actor.add_style_class_name('panel-status-button')

		let menuItem = new MenuItem('hello, world!',
			'system-run-symbolic')
		
		this.menu.addMenuItem(menuItem, 0)
	},

	addStaticItem: function(text, icon) {
		icon = icon || 'system-run-symbolic'

		log('New static menu item [text={}, icon={}]', text, icon)

		this.menu.addMenuItem(new MenuItem(text, icon))
	},

	addDynamicItem: function(text, icon, callback) {
		icon = icon || 'system-run-symbolic'
		log('New dynamic menu item [text={}, icon={}]', text, icon)
		
		let menuItem = new MenuItem(text, icon)
		menuItem.connect('activate', Lang.bind(this, function(menuItem, event){
			callback(menuItem, event);
		}))
		
		this.menu.addMenuItem(menuItem)
	}
});

