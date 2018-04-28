const Window = require('windows/window')
const gnome = require('gnome')
const log = require('utils/log')

module.exports = {
  getWindows () {
    log('Trying to find any windows')

    return gnome.get_window_actors()
      .map((a) => new Window(a))
      .filter((w) => w.isNormal)
  }
}
