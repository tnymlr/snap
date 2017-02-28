const ExtensionUtils = imports.misc.extensionUtils
const Me = ExtensionUtils.getCurrentExtension()

let snap = null

function init() {} //nothing to do here

function buildPrefsWidget(){
	snap = Me.imports.ui
	return snap.ui.widget
}

