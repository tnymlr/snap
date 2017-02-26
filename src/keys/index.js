const log = require('utils/log')

const Lang = imports.lang
const Meta = imports.gi.Meta
const Shell = imports.gi.Shell
const Main = imports.ui.main

module.exports = {
	KeyManager: new Lang.Class({
		Name: 'SnapKeyManager',

		_init: function() {
			this.grabbers = new Map()

			this.handler = global.display.connect(
				'accelerator-activated',
				Lang.bind(this, function(display, action, deviceId, timestamp){
					log('Accelerator Activated: [display={}, action={}, deviceId={}, timestamp={}]',
						display, action, deviceId, timestamp)
					this._onAccelerator(action)
				}))
		},

		startListenFor: function(accelerator, callback){
			log('Trying to listen for hot key [accelerator={}]', accelerator)
			let action = global.display.grab_accelerator(accelerator)

			if(action == Meta.KeyBindingAction.NONE) {
				log('Unable to grab accelerator [binding={}]', accelerator)
			} else {
				log('Grabbed accelerator [action={}]', action)
				let name = Meta.external_binding_name_for_action(action)
				log('Received binding name for action [name={}, action={}]',
					name, action)
				
				log('Requesting WM to allow binding [name={}]', name)
				Main.wm.allowKeybinding(name, Shell.ActionMode.ALL)

				this.grabbers.set(action, {
					name: name,
					accelerator: accelerator,
					callback: callback
				})
			}
		},

		stopListenFor: function(action) {
			let grabber = this.grabbers.get(action)
			log('Stopping listening for [binding={}, action={}, name={}]',
				grabber.accelerator, action, grabber.name)

			let success = global.display.ungrab_accelerator(action)
			if(success) {
				log('Stopped listening for [binding={}, action={}, name={}]',
					grabber.accelerator, action, grabber.name)
				this.grabbers.delete(action)
			} else {
				log('Failed to stop listening for [binding={}, action={}, name={}]',
					grabber.accelerator, action, grabber.name)
			}

			return success
		},

		stopListenForAll: function() {
			log('Stopping listening for all registered key bindings')

			let success = true
			for(let [action, grabber] of this.grabbers.entries()) {
				success = success && this.stopListenFor(action)
			}

			if(success) {
				global.display.disconnect(this.handler)
				log('All registered key bindings have been released')
			}
		},

		_onAccelerator: function(action) {
			let grabber = this.grabbers.get(action)

			if(grabber) {
				grabber.callback(grabber.accelerator)
			} else {
				log('No listeners [action={}]', action)
			}
		}
	})
}
