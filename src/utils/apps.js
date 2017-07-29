const Lang = require('lang')
const GObject = require('gi/gobject')
const Gio = require('gi/gio')
const AppInfo = Gio.AppInfo

const log = require('utils/log')

const App = new Lang.Class({
    Name: 'App',
    GTypeName: 'SnapUtilsApp',
    Extends: GObject.Object,

    _init: function(appInfo) {
        this.appInfo = appInfo
    },

    get id() {return this.app.get_id()},
    get icon() {return this.app.get_icon()},
    get name() {return this.app.get_name()},
    get displayName() {return this.app.get_display_name()},
    get commandline() {return this.app.get_commandline()},
    get app() {return this.appInfo}
})

const apps = AppInfo.get_all().map((info) => {
    return new App(info)
})

module.exports.all = function() {
    return apps
}

module.exports.forId = function(id) {
    const app = apps.find((app) => app.id === id)
    log('FOUND: {}', app)

    return app
}
