const Lang = require('lang')
const Gio = require('gi/gio')
const AppInfo = Gio.AppInfo

module.exports.Apps = new Lang.Class({
	Name: 'Snap.Widgets.Combos.Apps',
	GTypeName: 'SnapWidgetsCombosApp',

	_init: function(builder, window) {
		this.window = window
		this.combo = this.initAppCombo(builder)
		this.model = this.initAppModel(builder)
	},

	initAppCombo: function(builder) {
		const combo = builder.get_object('shortcut-app-combo')
		return combo
	},

	initAppModel: function(builder) {
		const model = builder.get_object('apps')
		return model
	}
})
