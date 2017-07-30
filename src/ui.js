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
            Lang.bind(this, this.onKey))
        controller.connect(
            controller.events.SHORTCUT_ERASED,
            Lang.bind(this, this.onErase))
        controller.connect(
            controller.events.APPLY,
            Lang.bind(this, this.onApply))
    },

    onAdd: function(source, row, app) {
        model.create(row)
            .withApp(app)
    },

    onDelete: function(source, row) {
        model.remove(row)
    },

    onApp: function(source, row, app) {
        model.setApp(row, app)
    },  

    onKey: function(source, row, key) {
        model.setShortcut(row, key)
    },

    onErase: function(source, row, key) {
        model.setShortcut(row, '')
    },
    
    onApply: function(source) {
        log('Applying:')
        model.forEach((item) => {
            log('\tShortcut [app={}, key={}]', item.app ? item.app.id : null, item.shortcut)
        })
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

