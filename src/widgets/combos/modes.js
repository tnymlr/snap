// const Lang = require('lang')
// const settings = require('settings')
// const apps = require('utils/apps')

const thread = require('clojure-thread')

function initCombo (ctx) {
  const builder = ctx.builder
  const combo = builder.get_object('shortcut-match-mode-combo')
  combo.set_active(0)

  return Object.assign(ctx, {
    widget: combo
  })
}

function initApi (ctx) {
  Object.defineProperty(ctx, 'activeId', {
    get () {
      return ctx.widget.get_active_id()
    }
  })

  return ctx
}

function initEvents (ctx) {
  const handlers = ctx.handlers
  const onChange = ctx.signals.onChange
  const combo = ctx.widget

  const onChangeHandler = combo.connect('changed', () => {
    onChange(ctx.activeId)
  })

  handlers.push(onChangeHandler)

  return ctx
}

function start (ctx) {
  return thread.first(ctx,
    initCombo,
    initApi,
    initEvents)
}

function create (builder, onChange) {
  return {
    builder: builder,
    signals: {
      onChange: onChange
    },
    handlers: []
  }
}

function builder (ctx) {
  return class {
    withBuilder (builder) {
      ctx.builder = builder
      return this
    }

    onChange (fn) {
      ctx.signals.onChange = fn
      return this
    }

    start () {
      return start(ctx)
    }
  }
}

module.exports = {
  create: function () {
    const Builder = builder(create())

    return new Builder()
  }
}
