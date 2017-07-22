const Gio = require('gi/gio')
const Settings = Gio.Settings
const Schema = Gio.SettingsSchema
const Backend = Gio.SettingsBackend
const Source = Gio.SettingsSchemaSource

const GLib = require('gi/glib')
const Variant = GLib.Variant
const VariantType = GLib.VariantType


const data = require('utils/data')
const log = require('utils/log')

const builders = require('./builders')

module.exports.createSettings = function() {
	return new builders.SettingsBuilder()
}

module.exports.createShortcut = function() {
	return new builders.ShortcutBuilder()
}

module.exports.save = function(builder){
	log('Saving settings...')

	log('Preparing schema...')
	const schema = source.lookup('org.gnome.shell.extensions.snap', true)
	log('Schema is ready!')

	log('Opening settings...')
	const settings = new Settings({
		settings_schema: schema
	})
	log('Settings is ready!')

	log('Preparing GLib Types...')
	const GString = new VariantType('s')
	const GTuple = new VriantType.new_tuple(Array(3).fill(GString))
	log('GTypes is ready!')

	log('Transposing JS objects into writable GLib Variants...')
	const value = Variant.new_array(GTuple, builder.shortcuts.map((shortcut) => {
		return Variant.new_tuple(shortcut.map((record) => {
			return Variant.new_string(record)
		}))
	}))
	log('Done transposing JS objects into writable GLib Variants')

	log('Ready to save settings...')
	settings.set_value('shortcuts', value)
	log('Syncing...')
	settings.sync()
	log('Settings has been saved!')
}
