const Window = require('windows/window')
const log = require('utils/log')
const gnome = require('gnome')


module.exports = {
	getWindows: function() {
		log('Trying to find any windows')

		return gnome.get_window_actors().map((a) => {
			log('Got a window!')
			let w = new Window(a)

			log('Window: [title={}, class={}, type={}]',
				w.title, w.wmClass, w.type)

			return w
		}).filter((w) => {
			let result = w.isNormal
			log('Filtering window [result={}]', result)
			return result
		})

	}
}
