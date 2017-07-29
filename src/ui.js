const Lang = require('lang')
const widgets = require('widgets')

const controller = require('widgets/controller')
const model = require('settings/model')

const log = require('utils/log')

const SnapListener = new Lang.Class({
    Name: "SnapListener",

    _init: function(){
        controller.connect(
            controller.events.SHORTCUT_ADDED,
            Lang.bind(this, this.onAdd))
        controller.connect(
            controller.events.SHORTCUT_DELETED,
            Lang.bind(this, this.onDelete))
        controller.connect(
            controller.events.APP_SELECTED,
            Lang.bind(this, this.onApp))
        controller.connect(
            controller.events.SHORTCUT_INPUT,
            Lang.bind(this, this.onKey)),
        controller.connect_(
            controller.events.SHORTCUT_ERASED,
            Lang.bind(this, this.onErase))
    },

    onAdd: function(row, app) {
        log(
            'Got a new row [{}] with default app [id={}, name={}]',
            row,
            app.id,
            app.name)

        model.create(row)
            .withApp(app)
    },

    onDelete: function(row) {
        log('Lost a row [{}]', row)
    },

    onApp: function(row, app) {
        log('Got an app [row={}, app={}]', row, app)
    },  

    onKey: function(row, key) {
        log('Got a key [row={}, key={}]', row, key)
    },

    onErase: function(row, key) {
        log('Lost a key [row={}, key={}]', row, key)
    }
})

const SnapWidget = new Lang.Class({
	Name: 'SnapWidget',

	_init: function(){
		this.settings = new widgets.SettingsWidget()
		this.listener = new SnapListener()
	},

	get widget(){
		this.settings.show_all()
		return this.settings
	}
});

module.exports = new SnapWidget()

