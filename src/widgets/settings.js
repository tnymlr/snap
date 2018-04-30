const Lang = require('lang')
const Gtk = require('gi/gtk')

const data = require('utils/data')
const log = require('utils/log')

// const settings = require('settings')
//
const buttons = require('./buttons')
// const shortcut = require('./shortcut')

const initBuilder = (ctx) => {
  const builder = new Gtk.Builder()
  builder.add_from_file(data.glade(ctx.glade.name))

  return Object.assign(ctx, {
    builder: builder
  })
}

const initMainWidget = (ctx) => {
  const builder = ctx.builder

  const widget = builder.get_object(ctx.glade.mainId)

  widget.hexpand = true
  widget.vexpand = true
  widget.hexpand_set = true
  widget.vexpand_set = true
  widget.halign = Gtk.Align.FILL
  widget.valign = Gtk.Align.FILL

  return Object.assign(ctx, {
    widget: widget
  })
}

const initNotebook = (ctx) => {
  const builder = ctx.builder
  const glade = ctx.glade

  const notebook = builder.get_object(glade.notebookId)
  notebook.connect('switch-page', Lang.bind(this, (notebook, page, pageNum, userData) => {
    log('Page switch! Got [notebook={}, page={}, pageNum={}, userData={}', notebook, page, pageNum, userData)
  }))

  return ctx
}

const initShortcuts = (ctx) => {
  const glade = ctx.glade
  const builder = ctx.builder
  const list = builder.get_object(glade.simpleId)

  return Object.assign(ctx, {
    get shortcuts () {
      return list
    }
  })
}

const initButtons = (ctx) => {
  const builder = ctx.builder
  const addButton = new buttons.Add(builder, ctx)
  const applyButton = new buttons.Apply(builder, ctx)

  return Object.assign(ctx, {
    buttons: {
      add: addButton,
      apply: applyButton
    }
  })
}

const create = () => {
  return {
    glade: {
      name: 'snap-settings-tabbed',
      mainId: 'settings-box',
      simpleId: 'shortcuts-simple-list',
      advancedId: 'shortcuts-advanced-list',
      notebookId: 'shortcuts-notebook'
    }
  }
}

const start = (ctx) => {
  ctx = initBuilder(ctx)
  ctx = initNotebook(ctx)
  ctx = initMainWidget(ctx)
  ctx = initShortcuts(ctx)
  ctx = initButtons(ctx)
  return ctx
}

const stop = (ctx) => Object.assign(ctx, {
  builder: null,
  widget: null
})

module.exports = {
  create: () => {
    let ctx = create()

    return {
      start: () => {
        ctx = start(ctx)
      },
      stop: () => {
        ctx = stop(ctx)
      },

      get widget () {
        return ctx.widget
      }
    }
  }
}

// module.exports = new Lang.Class({
//   Name: 'Snap.Widgets.Settings',
//   GTypeName: 'SnapWidgetsSettings',
//   Extends: Gtk.Box,
//
//   _init: function (params) {
//     this.parent(params)
//
//     this.hexpand = true
//     this.vexpand = true
//     this.hexpand_set = true
//     this.vexpand_set = true
//     this.halign = Gtk.Align.FILL
//     this.valign = Gtk.Align.FILL
//
//     this.builder = this.initBuilder()
//
//     this.mainWidget = this.initMainWidget(this.builder)
//     this.shortcuts = this.initShortcuts(this.builder)
//     this.addButton = new buttons.Add(this.builder, this)
//     this.applyButton = new buttons.Apply(this.builder, this)
//     this.initSettings()
//   },
//
//   initBuilder: function () {
//     const builder = new Gtk.Builder()
//     builder.add_from_file(data.glade('snap-settings'))
//     return builder
//   },
//
//   initMainWidget: function (builder) {
//     const widget = builder.get_object('settings-box')
//     this.add(widget)
//     return widget
//   },
//
//   initShortcuts: function (builder) {
//     const list = builder.get_object('shortcuts-list')
//     return list
//   },
//
//   initSettings: function () {
//     settings.all.forEach((item) => {
//       const widget = new shortcut.Widget(this, item)
//       this.shortcuts.insert(widget, -1)
//     })
//   }
// })
