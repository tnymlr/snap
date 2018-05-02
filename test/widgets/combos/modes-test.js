const assert = require('assert')

const modes = require('widgets/combos/modes')

const value = 'foo'
const signal = 'changed'

const builder = {
  get_object: function (id) {
    builder.state.comboId = id

    return {
      get_active_id: function () {
        return value
      },
      set_active: function (idx) {
        builder.state.activeId = idx
      },
      connect: function (event, fn) {
        builder.state.event = event
        builder.state.fn = fn
      }
    }
  },
  state: {}
}

const combo = modes.create()
  .withBuilder(builder)
  .onChange((value) => {
    builder.state.value = value
  })
  .start()

describe('Matching modes Combo Box', () => {
  it('should return the context of Combo Box', () => {
    assert.ok(combo, 'Expected to have Combo Box context')
  })

  it('should invoke callback with current active item id', () => {
    builder.state.fn()
    assert.equal(builder.state.value, value)
  })

  it('should use proper widget id', () => {
    assert.equal(builder.state.comboId, 'shortcut-match-mode-combo')
  })

  it('should make the first item in the list active', () => {
    assert.equal(builder.state.activeId, 0)
  })

  it('should listed for "changed" signal on Combo Box', () => {
    assert.equal(builder.state.event, signal)
  })
})
