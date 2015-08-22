var React = require('react')
var TestUtils = require('react/addons').TestUtils

var AccordionNode = require('./AccordionNode.js')
describe('AccordionNode', function () {
  it('render AccordionNode with no children', function () {
    var TestUtils = require('react').addons.TestUtils
    var node = TestUtils.renderIntoDocument( <AccordionNode/>)
    var elem = TestUtils.findRenderedDOMComponentWithTag(node, 'span').getDOMNode()
    expect( elem.innerHTML ).to.match(/AccordionNode/)
  })
})
