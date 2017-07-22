module.exports = function() {
	let _exec, _name, _shortcut

	const self = {
		withExecutable: function(exec) {
			_exec = exec
			return this
		},

		withName: function(name) {
			_name = name
			return this
		},

		withShortcut: function(shortcut) {
			_shortcut = shortcut
			return this
		},

		get shortcut () {
			if(!_exec) {
				throw new Error('Executable for application is required')
			}

			if(!_name) {
				throw new Error('Application name is required')
			}

			if(!_shortcut) {
				throw new Error('Keyboard shortcut is requried')
			}

			return [
				_shortcut,
				_name,
				_exec
			]
		}
	}

	return self
}
