const Lang = require('lang')
const widgets = require('widgets')

const SnapUI = new Lang.Class({
	Name: 'SnapUI',

	_init: function(){
		this.settings = new widgets.SettingsWidget()
	},

	get widget(){
		this.settings.show_all()
		return this.settings
	}
});

module.exports = new SnapUI()

