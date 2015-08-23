var React = require('react')
require('react/addons')
var TestUtils = React.addons.TestUtils

var AccordionNode = require('./AccordionNode.js')
describe('AccordionNode', function () {
  it('is collapsed by default', function () {
    var node = TestUtils.renderIntoDocument( <AccordionNode/>)
    var elem = TestUtils.findRenderedDOMComponentWithTag(node, 'span').getDOMNode()
    expect( elem.getAttribute('class') ).to.match(/collapsed/)
  })
})
