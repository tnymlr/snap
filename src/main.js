const log = require('utils/log');
const keys = require('keys');

const windows = require('windows');

const Lang = require('lang');

const settings = require('settings');

const manager = keys.create();

const KeyController = new Lang.Class({
	Name: 'SnapKeyController',

	_init: function() {
	},

	setupKeys: function(keys){
		log('Received settings! Setting up listeners for keys...');
		for(let shortcut of keys) {
			const key = shortcut.key;
			const app = shortcut.app;

			manager.onKey(key).do((key) => {
                //we take all the windows
                windows.Manager.getWindows().map((w) => {
                    const wmClass = w.wmClass.toLowerCase();

                    // and we take the app and count how much words in the name
                    // of an app we can find in window class.
                    // this is 'weight' of our window
                    const window =  {
                        weight: app.toLowerCase()
                            .split(' ')
                            .filter((word) => wmClass.indexOf(word) >= 0)
                            .length,
                        window: w
                    };
                    return window;
                }).sort((a, b) => { //windows with bigger weight go to the top.
                    return a.weight < b.weight
                        ? -1
                        : a.weight > b.weight
                            ? 1
                            : 0
                }).reverse().reduce((col, val) => { // and we take only windows with largest weight
                    if(col.length < 1 || col[col.length - 1].weight === val.weight) {
                        return col.concat([val])
                    }

                    return col
                }, []).forEach((item) => { // bring it on
                    item.window.raise()
                })
            });
		}
		log('Done setting up listeners for keys!')
	}
});

const SnapExtension = new Lang.Class({
	Name: 'SnapExtension',

	_init: function(){
		this.keyController = new KeyController()
	},

	enable: function(){
		log('Enabling...');

		log('Starting key manager...');
		manager.start();
		log('Key manager has been started');

		log('Loading shortcuts from settings...');
		const shortcuts = settings.all.map((item) => {
			const shortcut = {key: item.key, app: item.name};
			log('Got shortcut [key={}, app={}]', shortcut.key, shortcut.app);
			return shortcut
		});
		log('Done loading shortcuts from settings!');
		this.keyController.setupKeys(shortcuts);

		log('Enabled!')
	},

	disable: function(){
		log('Disabling...');

		log('Stopping key manager...');
        manager.stop();
        log('Key manager has stopped');
        log('Disabled!')
	}
});

module.exports = new SnapExtension();

