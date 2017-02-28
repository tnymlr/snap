const ExtensionUtils = imports.misc.extensionUtils
const Me = ExtensionUtils.getCurrentExtension()

let settings = new Map()
let snap = null

function init() {
	settings.set('<alt>2', 'firefox')
	settings.set('<alt><super>m', 'evolution')
	settings.set('<alt><super>b', 'builder')
	settings.set('<alt>6', 'telegram')
}

function enable() {
	disable() //make sure we have no leftovers in case of restart/reload

	snap = Me.imports.main //this sets global variable
	snap.main.enable(settings)
}

function disable() {
	if(snap) {
		snap.main.disable()
		snap = null
	}
}
