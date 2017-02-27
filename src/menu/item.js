const PopupMenu = require('ui/popupMenu')
const St = require('gi/st')
const Lang = require('lang')

module.exports = new Lang.Class({
	Name: 'SnapMenuItem',
	Extends: PopupMenu.PopupBaseMenuItem,

	_init: function(text, icon) {
		this.parent(null, 'SnapMenuItem')
		this.actor.add_child(new St.Icon({
			icon_name: icon,
			style_class: 'popup-menu-icon'
		}), {
			align: St.Align.END
		})
		this.actor.add_child(new St.Label({
			text: text
		}))
	}
})

