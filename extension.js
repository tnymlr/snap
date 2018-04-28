// eslint-disable-next-line no-undef
const ExtensionUtils = imports.misc.extensionUtils
const Me = ExtensionUtils.getCurrentExtension()

let snap = null

// eslint-disable-next-line no-unused-vars
function init () {
}

// eslint-disable-next-line no-unused-vars
function enable () {
  disable() // make sure we have no leftovers in case of restart/reload

  snap = Me.imports.main // this sets global variable
  snap.main.enable()
}

function disable () {
  if (snap) {
    snap.main.disable()
    snap = null
  }
}
