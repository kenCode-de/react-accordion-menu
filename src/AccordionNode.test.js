var React = require('react')
require('react/addons')
var TestUtils = React.addons.TestUtils

var AccordionNode = require('./AccordionNode.js')
describe('AccordionNode', function () {
  it('render AccordionNode with no children', function () {
    var node = TestUtils.renderIntoDocument( <AccordionNode expanded={false}/>)
    var elem = TestUtils.findRenderedDOMComponentWithTag(node, 'span').getDOMNode()
    expect( elem.getAttribute('class') ).to.match(/collapsed/)
  })
})
