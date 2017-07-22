const Lang = require('lang')

const format = require('string-format')

const capitalize = function(string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports.create = function(name, onClick){
	const capitalName = capitalize(name)

	return new Lang.Class({
		Name: 'Snap.Widgets.Settings.Buttons.' + capitalName,
		GTypeName: 'SnapWidgetsSettingsButtons' + capitalName,

		_init: function(builder, widget) {
			this.widget = widget
			this.button = this.initButton(builder)
		},

		initButton: function(builder) {
			const button = builder.get_object(format('settings-{}-button', name))
			button.connect('clicked', Lang.bind(this, this.clicked))
			return button
		},

		clicked: function() {
			onClick(this.widget)
		}
	})
}
