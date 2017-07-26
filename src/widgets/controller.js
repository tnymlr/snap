const Lang = require('lang')
const GObject = require('gi/gobject')
const Gio = require('gi/gio')
const Gtk = require('gi/gtk')

const Events = {
    SHORTCUT_ADDED: 'shortcut-added',
    SHORTCUT_DELETED: 'shortcut-deleted',
    APP_SELECTED: 'app-selected',
	SHORTCUT_INPUT: 'shortcut-input',
	SHORTCUT_ERASED: 'shortcut-erased'
}

const signals = {}
signals[Events.SHORTCUT_ADDED] = {
    param_types: [ Gtk.ListBoxRow ]
}
signals[Events.SHORTCUT_DELETED] = {
    param_types: [ Gtk.ListBoxRow ]
}
signals[Events.APP_SELECTED] = {
    param_types: [ Gtk.ListBoxRow, Gio.AppInfo ]
}
signals[Events.SHORTCUT_INPUT] = {
	param_types: [ Gtk.ListBoxRow, GObject.String ]
}
signals[Events.SHORTCUT_ERASED] = {
	param_types: [ Gtk.ListBoxRow, GObject.String ]
}

const Controller = new Lang.Class({
    Name: 'Controller',
    GTypeName: 'SnapController',
    Extends: GObject.Object,

    Signals: signals,

    _init: function(){
        this.parent({})
        this.events = Events
    },
})

module.exports = new Controller()

