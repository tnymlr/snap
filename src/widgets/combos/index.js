const Lang = require('lang')
const Gtk = require('gi/gtk')
const Gio = require('gi/gio')
const AppInfo = Gio.AppInfo

const log = require('utils/log')

const apps = function(){
	return new (function(){
		const self = {
			all: function() {
				return AppInfo.get_all().map((info) => {
					const app = {
						icon: info.get_icon(),
						id: info.get_id(),
						name: info.get_name(),
						displayName: info.get_display_name(),
						commandline: info.get_commandline()
					};

					return app
				})
			}
		}

		return self
	})()
}

module.exports.Apps = new Lang.Class({
	Name: 'Snap.Widgets.Combos.Apps',
	GTypeName: 'SnapWidgetsCombosApp',

	_init: function(builder, window) {
		this.window = window
		this.model = this.initAppModel(builder)
		this.combo = this.initAppCombo(builder)
	},

	initAppCombo: function(builder) {
		const combo = builder.get_object('shortcut-app-combo')

		const iconRenderer = new Gtk.CellRendererPixbuf()
		const textRenderer = new Gtk.CellRendererText()

		combo.pack_start(iconRenderer, false)
		combo.pack_end(textRenderer, false)

		combo.add_attribute(iconRenderer, 'gicon', 1)
		combo.add_attribute(textRenderer, 'text', 2)

		combo.set_active(0)


		this.comboHandler = combo.connect('changed', Lang.bind(this, this.onComboChange))
		combo.connect('popdown', Lang.bind(this, this.onPopdown))
		combo.connect('popup', Lang.bind(this, this.onPopup))

		return combo
	},

	initAppModel: function(builder) {
		const model = builder.get_object('apps')

		apps().all().forEach((app) => {
			if(app.icon && app.name && app.name.length > 0) {
				let iter = model.append()
				model.set(iter, [0], [app.id])
				model.set(iter, [1], [app.icon])
				model.set(iter, [2], [app.name])
			}
		})

		model.connect('row-deleted', Lang.bind(this, this.onAppDeleted))

		return model
	},

	onComboChange: function() {
		const id = this.combo.get_active_id()
		log('App selected: {}', this.combo.get_active_id())
	},

	onPopdown: function() {
		log('Popdown!')
	},

	onPopup: function() {
		log('Popup!')
	},

	onAppDeleted: function() {
		log('App deleted!')
	}
})
