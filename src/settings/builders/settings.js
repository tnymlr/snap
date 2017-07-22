module.exports = function() {
	let _shortcuts = []

	const self = {
		withShortcut: function(builder) {
			_shortcuts.push(builder.shortcut)
		},

		withEach: function(arr, builder) {
			arr.forEach((item) => {
				_shortcuts.push(builder(item).shortcut)
			})
		},

		get shortcuts() {
			return _shortcuts
		}
	}
}
