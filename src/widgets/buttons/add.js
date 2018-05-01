const log = require('utils/log')

const shortcuts = require('../shortcuts')
const pages = require('../settings/pages')

const factory = require('./factory')

module.exports = factory.create('add', (ctx) => {
  pages.with(ctx)
    .forSimple((page) => new shortcuts.Simple(ctx))
    .forAdvanced((page) => new shortcuts.Advanced(ctx))
    .do((page, widget) => {
      log('Inserting [widget={}] into [page={}]', widget, page)
      page.insert(widget, -1)
    })
})
