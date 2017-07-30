const Gio = require('gi/gio')
const Settings = Gio.Settings
const Schema = Gio.SettingsSchema
const Backend = Gio.SettingsBackend
const Source = Gio.SettingsSchemaSource

const GLib = require('gi/glib')
const Variant = GLib.Variant
const VariantType = GLib.VariantType

const _ = require('underscore')

const data = require('utils/data')
const log = require('utils/log')

const source = Source.new_from_directory(data.dir, null, false)

const shortcut = function(item) {
	return {
		get id() {
			return item[0]
		},

		set id(id) {
			item[0] = id
		},

		get name() {
			return item[1]
		},

		set name(name) {
			item[1] = name
		},
		
		get shortcut() {
			return item[2]
		},

		set shortcut(shortcut) {
			item[2] = shortcut
		},

		get executable() {
			return item[3]
		},

		set executable(executable) {
			item[3] = executable
		}
	}
}

const builder = function(self) {
	const builder = {}

	builder.withId = function(id) {
		self.id = id
		return builder
	}

	builder.withName = function(name) {
		self.name = name
		return builder
	}

	builder.withExecutable = function(executable) {
		self.executable = executable
		return builder
	}

	builder.withShortcut = function(shortcut) {
		self.shortcut = shortcut
		return builder
	}

	return builder
}

module.exports = _.extend([], {
	create: function() {
		const item = []
		this.push(item)

		return builder(shortcut(item))
	},

	save: function(){
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
		const GTuple = VariantType.new_tuple(Array(4).fill(GString))
		log('GTypes is ready!')

		log('Transposing JS objects into writable GLib Variants...')
		const value = Variant.new_array(GTuple, this.map((shortcut) => {
			log('\tTrying to transpose [shortcut={}]', shortcut)
			return Variant.new_tuple(shortcut.map((record) => {
				log('\t\tTransposing field [value={}]', record)
				return Variant.new_string(record)
			}))
		}))
		log('Done transposing JS objects into writable GLib Variants')

		log('Ready to save settings...')
		settings.set_value('shortcuts', value)
		log('Settings has been saved!')
	}
})