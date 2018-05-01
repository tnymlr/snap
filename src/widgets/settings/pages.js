function isPage (ctx, expected) {
  const page = ctx.page

  return page === expected
}

function isSimple (ctx) {
  return isPage(ctx, ctx.glade.pages.simple)
}

function isAdvanced (ctx) {
  return isPage(ctx, ctx.glade.pages.advanced)
}

function getPage (ctx) {
  const builder = ctx.builder
  const glade = ctx.glade

  if (isSimple(ctx)) {
    return builder.get_object(glade.lists.simple)
  } else if (isAdvanced(ctx)) {
    return builder.get_object(glade.lists.advanced)
  } else {
    throw new Error('Unknown page')
  }
}

function generator (ctx, page, data) {
  const result = {
    forSimple: function (fn) {
      if (isSimple(ctx)) {
        return generator(ctx, page, fn(page))
      } else {
        return result
      }
    },

    forAdvanced: function (fn) {
      if (isAdvanced(ctx)) {
        return generator(ctx, page, fn(page))
      } else {
        return result
      }
    },

    do: function (fn) {
      return fn(page, data)
    }
  }

  return result
}

module.exports.with = (ctx) => {
  return generator(ctx, getPage(ctx))
}
