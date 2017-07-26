const Gio = require('gi/gio')
const AppInfo = Gio.AppInfo

const _ = require('underscore')

const apps = AppInfo.get_all().map((info) => {
    const app = {
	    icon: info.get_icon(),
	    id: info.get_id(),
	    name: info.get_name(),
	    displayName: info.get_display_name(),
	    commandline: info.get_commandline()
    };

    return _.extend(info, {
        get id() {return info.get_id()},
	    get icon() {return info.get_icon()},
	    get name() {return info.get_name()},
	    get displayName() {return info.get_display_name()},
	    get commandline() {return info.get_commandline()}
    })
})

module.exports.all = function() {
    return apps
}

module.exports.forId = function(id) {
    return apps.find((app) => app.id === id)
}
