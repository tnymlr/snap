const Gtk = require('gi/gtk')

const thread = require('clojure-thread')

const data = require('utils/data')
const log = require('utils/log')

// const settings = require('settings')
//
const buttons = require('../buttons')
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

const initSwitcher = (ctx) => {
  const builder = ctx.builder
  const glade = ctx.glade

  const stack = builder.get_object(glade.stackId)

  Object.defineProperty(ctx, 'page', {
    get () {
      return stack.get_visible_child_name()
    },

    set (v) { }
  })

  return ctx
}

const initShortcuts = (ctx) => {
  const glade = ctx.glade
  const builder = ctx.builder

  const simple = builder.get_object(glade.lists.simple)
  const advanced = builder.get_object(glade.lists.advanced)

  Object.defineProperty(ctx, 'shortcuts', {
    get () {
      switch (ctx.page) {
        case glade.pages.simple:
          log('Using simple list')
          return simple
        case glade.pages.advanced:
          log('Using advanced list')
          return advanced
        default:
          throw new Error('Unknown stack page')
      }
    },

    set (v) { }
  })

  return ctx
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
      stackId: 'settings-stack',
      lists: {
        simple: 'shortcuts-simple-list',
        advanced: 'shortcuts-advanced-list'
      },
      pages: {
        simple: 'simple-page',
        advanced: 'advanced-page'
      }
    }
  }
}

const start = (ctx) => {
  return thread.first(ctx,
    initBuilder,
    initSwitcher,
    initMainWidget,
    initShortcuts,
    initButtons)
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
