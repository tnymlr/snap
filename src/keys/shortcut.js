const Lang = require('lang')
const Gdk = require('gi/gdk')

const parser = require('./parser')
const modifier = require('./modifier')

const rules = [
	parser((state, result) => {
		const name = result.string
		const rule = new RegExp('^[a-zA-Z0-9]+$')
		return name && rule.test(name)
	}, '', true, false),
	modifier(Gdk.ModifierType.SUPER_MASK, 'super', false),
	modifier(Gdk.ModifierType.MOD1_MASK, 'alt', false),
	modifier(Gdk.ModifierType.CONTROL_MASK, 'control', false),
	// this makes sure that we have at least one modifier enabled
	modifier(Gdk.ModifierType.MODIFIER_MASK, false, true)
]

module.exports = function(state, keyval) {
	let result = {
		valid: false,
		string: '',
	}

	if(state[0] && keyval[0]) {
		result.valid = true,
		result.string = Gdk.keyval_name(keyval[1])

		rules.forEach((rule) => {
			result = rule(state[1], result)
		})
	}

	return result
}
