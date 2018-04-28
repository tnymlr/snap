const format = require('string-format')

/**
 * This is a simple factory which generates functions
 * which can be used as rules to parse keyboard shortcuts
 *
 * The main goal is to provide possbility to combine sets of rules to
 * validate Gdk.EventKey and generate keyboard shortcut string
 * accordingly generated rules
 *
 * It accepts:
 *   `condition` - a function to validate shortuct
 *   `name` - a name to insert as string into shortcut description
 *   `mandatory` - a flag which specifies that this rule is mandatory
 *
 * Mandatory rules break result, make it faulty.
 * Non-mandatory rules just pass result as it is.
 *
 * Generates function(a rule) accepts two parameters:
 *   `state` - this is state field from Gdk.EventKey
 *   `result` - result of previous rule application
 *
 * Generated function returns 'result' as follows:
 *
 * {
 *   valid: true|false - indicates if the receives state and result satisfy the rule
 *   string: updated shortcut string
 * }
 *
 * `string` attribute in result is generated as follows:
 *   if `name` closure is available it will be wrapped in <> and it will
 *   prepend previous result string
 *   if `name` closure is empty whole content of previous `result.string` will
 *   wrapped into <>
 *   if `name` closure is unavailable, it propagates previous `result.string`
 *
 */
module.exports = function (condition, name, mandatory, wrap = true) {
  return function (state, result) {
    if (condition(state, result)) {
      result.valid &= true
      if (name.length > 0) {
        result.string = format('<{}>{}', name, result.string)
      } else if (name.length < 1) {
        result.string = format(wrap ? '<{}>' : '{}', result.string)
      }
    } else if (mandatory) {
      result.valid = false
    }

    return result
  }
}
