var path = require('path');

module.exports = {
  entry: {
		main: './src/main.js',
		ui: './src/ui.js'
	},
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname),
		libraryTarget: 'var',
		library: '[name]'
  },
	resolve: {
		modules: [
			path.resolve('./src'),
			'node_modules'
		]
	},
	externals: {
		'gnome': 'global',
		'lang': 'imports.lang',
		'gi/meta': 'imports.gi.Meta',
		'gi/shell': 'imports.gi.Shell',
		'ui/main': 'imports.ui.main',
		'ui/popupMenu': 'imports.ui.popupMenu',
		'ui/panelMenu': 'imports.ui.panelMenu',
		'gi/atk': 'imports.gi.Atk',
		'gi/st': 'imports.gi.St'
	}
};

