const Gio = require('gi/gio')

const Settings = Gio.Settings
const Schema = Gio.SettingsSchema
const Backend = Gio.SettingsBackend
const Source = Gio.SettingsSchemaSource

const data = require('utils/data')
const log = require('utils/log')


module.exports = function(){
	log('Working...')

	const source = Source.new_from_directory(data.dir, null, false)

	log('Source: {}', source)

	const schema = source.lookup('org.gnome.shell.extensions.snap', true)

	log('Schema: {}', schema)

	const settings = new Settings({
		settings_schema: schema
	})

	log('Settings: {}', settings)
}
