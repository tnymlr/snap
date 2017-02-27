var path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'snap.js',
    path: path.resolve(__dirname),
		libraryTarget: 'var',
		library: 'main'
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

