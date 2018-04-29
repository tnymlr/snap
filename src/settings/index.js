const Gio = require('gi/gio')
const Settings = Gio.Settings
const Source = Gio.SettingsSchemaSource

const GLib = require('gi/glib')
const Variant = GLib.Variant
const VariantType = GLib.VariantType

const data = require('utils/data')
const log = require('utils/log')

const source = Source.new_from_directory(data.dir, null, false)
const GString = new VariantType('s')
const GTuple = VariantType.new_tuple(Array(4).fill(GString))

const KEY = 'shortcuts'

const schema = function () {
  log('Preparing schema...')
  const schema = source.lookup('org.gnome.shell.extensions.snap', true)
  log('Schema is ready!')

  return schema
}

const open = function () {
  log('Opening settings...')
  const settings = new Settings({
    settings_schema: schema()
  })
  log('Settings is ready!')

  return settings
}

const load = function () {
  log('Loading settings...')

  const items = []
  const settings = open()

  log('Getting value...')
  const value = settings.get_value(KEY)
  log('Value is loaded!')

  const settingsLength = value.n_children() // O(n) =(
  for (let idx = 0; idx < settingsLength; idx++) {
    const tuple = value.get_child_value(idx)
    const fieldsLength = tuple.n_children()
    const item = []
    for (let kdx = 0; kdx < fieldsLength; kdx++) {
      const field = tuple.get_child_value(kdx)
      const [str] = field.get_string()
      item.push(str)
    }
    items.push(item)
  }

  return items
}

const items = load()

const shortcutFor = function (item) {
  return {
    get id () {
      return item[0]
    },

    set id (id) {
      item[0] = id
    },

    get name () {
      return item[1]
    },

    set name (name) {
      item[1] = name
    },

    get key () {
      return item[2]
    },

    set key (key) {
      item[2] = key
    },

    get exec () {
      return item[3]
    },

    set exec (executable) {
      item[3] = executable
    },

    delete () {
      log('Deleting item [id={}, name={}, key={}, exec={}]', this.id, this.name, this.key, this.exec)
      items.forEach((item, idx) => {
        if (this.id === shortcutFor(item).id) {
          items.splice(idx, 1)
        }
      })
    }
  }
}

const readTuple = (tuple) => {
  const fields = ['id', 'name', 'key', 'exec']

  const result = {}

  for (let i = 0; i++; i < tuple.length) {
    result[fields[i]] = tuple[i]
  }

  return result
}

const start = (ctx) => {
  const tuples = load()

  return Object.assign({
    items: tuples.map(readTuple)
  }, ctx)
}

const stop = (ctx) => Object.assign(ctx, {items: []})

module.exports = {
  create () {
    let active = false
    let ctx = {items: []}

    return {
      start () {
        if (!active) {
          ctx = start(ctx)
          active = true
        }
      },

      stop () {
        if (active) {
          ctx = stop(ctx)
          active = false
        }
      },

      items () {
        return ctx.items
      }
    }
  },

  get (id) {
    let item = items.find((item) => shortcutFor(item).id === id)

    let shortcut

    if (item) {
      shortcut = shortcutFor(item)
    } else {
      item = []
      items.push(item)
      shortcut = shortcutFor(item)
      shortcut.id = id
    }

    return shortcut
  },

  get all () {
    return items.map((item) => shortcutFor(item))
  },

  save () {
    log('Saving settings...')

    const settings = open()

    log('Transposing JS objects into writable GLib Variants...')
    const value = Variant.new_array(GTuple, items.filter((item) => {
      const shortcut = shortcutFor(item)
      const result = shortcut.id && shortcut.name && shortcut.key && shortcut.exec

      if (!result) {
        log('\tItem [{}] missing required field, skipping...', item)
      }

      return result
    }).map((item) => {
      log('\tTrying to transpose [item={}]', item)
      return Variant.new_tuple(item.map((record) => {
        log('\t\tTransposing field [value={}]', record)
        return Variant.new_string(record)
      }))
    }))
    log('Done transposing JS objects into writable GLib Variants')

    log('Ready to save settings...')
    settings.set_value(KEY, value)
    log('Settings has been saved!')
  }
}
