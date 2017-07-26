const _ = require('underscore')

const builder = function(self, source) {
     const builder = {}

     builder.withApp = function(app){
        builder.app = app
        self.setApp(source, app)

        return builder
    }

    builder.withShortcut = function(shortcut) {
        builder.shortcut = shortcut
        self.setShortcut(source, shortcut)

        return builder
    }

    return builder
}

const shortcuts = _.extend([], {
    create: function(source) {
        const store = this
        const item = {
            source: source
        }
        this.push(item)

        return  _.extend(item, builder(this, source))
    },

    setApp: function(source, app) {
        this.forSource(source, (item) => {
            item.app = app
        })
    },

    setShortcut: function(source, shortcut) {
        this.forSource(source, (item) => {
            item.shortcut = shortcut
        })
    },

    forSource: function(source, action) {
        const item = this.find((item) => item.source === source)

        if(item) {
            action(item, this)
        }
    }
})


module.exports = shortcuts
