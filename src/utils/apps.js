const GObject = require('gi/gobject')
const Gio = require('gi/gio')
const AppInfo = Gio.AppInfo

const App = new GObject.Class({
  Name: 'App',
  GTypeName: 'SnapUtilsApp',
  Extends: GObject.App,

  Properties: {
    'app': GObject.ParamSpec.object(
      'app', '', '',
      GObject.ParamFlags.READABLE | GObject.ParamFlags.WRITABLE,
      Gio.AppInfo)
  },

  _init: function (appInfo) {
    this.parent({
      'app': appInfo
    })
  },

  get id () { return this.app.get_id() },
  get icon () { return this.app.get_icon() },
  get name () { return this.app.get_name() },
  get displayName () { return this.app.get_display_name() },
  get commandline () { return this.app.get_commandline() }
})

const apps = AppInfo.get_all().map((info) => {
  return new App(info)
})

module.exports.all = function () {
  return apps
}

module.exports.forId = function (id) {
  const app = apps.find((app) => app.id === id)

  return app
}
