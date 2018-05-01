const assert = require('assert')

const pages = require('widgets/settings/pages')

function create (type) {
  return {
    page: `${type}-page`,
    glade: {
      pages: {
        simple: 'simple-page',
        advanced: 'advanced-page'
      },
      lists: {
        simple: 'simple-list',
        advanced: 'advanced-list'
      }
    },
    builder: {
      get_object: (id) => id
    }
  }
}

describe('Pages', () => {
  it('should use response from simple callback when page is simple', () => {
    const ctx = create('simple')

    const data = pages.with(ctx)
      .forSimple((page) => {
        return 'foo'
      })
      .forAdvanced((page) => {
        return 'bar'
      })
      .do((page, data) => {
        return data
      })

    assert.equal(data, 'foo')
  })

  it('should use response from advanced callback when page is advanced', () => {
    const ctx = create('advanced')

    const data = pages.with(ctx)
      .forSimple((page) => {
        return 'foo'
      })
      .forAdvanced((page) => {
        return 'bar'
      })
      .do((page, data) => {
        return data
      })

    assert.equal(data, 'bar')
  })
})
