const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

let settings = new Map()

function init() {
		settings.set('<alt>2', 'firefox')
}

function enable() {
	disable() //make sure we have no leftovers in case of restart/reload

	let snap = Me.imports.snap //this sets global variable

	global.SnapExtension.enable(settings)
}

function disable() {
	if(global.SnapExtension) {
		global.SnapExtension.disable()
		global.SnapExtension = null
	}
}
