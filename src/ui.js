const Lang = require('lang')
const widgets = require('widgets')

const settings = require('settings')

const model = require('utils/model')

const log = require('utils/log')

const SnapWidget = new Lang.Class({
	Name: 'SnapWidget',

	_init: function(){
        this.settings = new widgets.SettingsWidget()
	},

	get widget(){
		this.settings.show_all()
		return this.settings
	}
});

module.exports = new SnapWidget()

