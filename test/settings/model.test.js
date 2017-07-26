const expect = require('chai').expect

const model = require('settings/model')

describe('model', function(){
    it('should be able to create new items for source', function(){
        const source = {}
        model.create(source)

        expect(model.length).to.be.equal(1)
    })

    it('should be able to find item for source', function(){
        const source = {}
        model.create(source)
        model.forSource(source, (item) => {
            expect(item.source).to.be.equal(source)
        })
    })

    it('should update app object for item with source using builder', function(){
        const source = {}
        const app = {}

        model.create(source)
            .withApp(app)

        model.forSource(source, (item) => {
            expect(item.app).to.be.equal(app)
        })
    })

    it('should update shortcut object for item with source using builder', function(){
        const source = {}
        const shortcut = '<control><alt><delete>'

        model.create(source)
            .withShortcut(shortcut)

        model.forSource(source, (item) => {
            expect(item.shortcut).to.be.equal(shortcut)
        })
    })

    it('should be able to update app for source', function(){
        const source = {}
        const app = {}

        model.setApp(source, app)

        model.forSource(source, (item) => {
            expect(item.app).to.be.equal(shortcut)
        })
    })

    it('should be able to update shortcut for source', function(){
        const source = {}
        const shortcut = '<control><alt>&'

        model.setShortcut(source, shortcut)

        model.forSource(source, (item) => {
            expect(item.shortcut).to.be.equal(shortcut)
        })
    })
})
