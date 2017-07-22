const parser = require('./parser')

/**
 * This function is wrapper around shortcut rule generation function
 * which primary goal is go generate rules to check if certain
 * Gdk.ModifierMask is applied and modify keyboard shortcut string
 * accordingly
 */
module.exports = function(mask, name, mandatory) {
	return parser((state) => {
		return state & mask
	}, name, mandatory)
}
