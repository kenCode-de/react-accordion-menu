var React = require('react')
require('react/addons')
var TestUtils = React.addons.TestUtils

var AccordionNode = require('./AccordionNode.js')
describe('AccordionNode', function () {
  it('is collapsed by default', function () {
    var node = TestUtils.renderIntoDocument( <AccordionNode/>)
    var elem = TestUtils.findRenderedDOMComponentWithTag(node, 'li').getDOMNode()
    expect( elem.getAttribute('class') ).to.match(/collapsed/)
  })
  it('when clicked becomes expanded', function () {
    var node = TestUtils.renderIntoDocument( <AccordionNode/>)
    var elem = TestUtils.findRenderedDOMComponentWithTag(node, 'li').getDOMNode()
    TestUtils.Simulate.click(elem)
    expect( elem.getAttribute('class') ).to.match(/expanded/)
  })
  it('renders children', function () {
    var child = <span className="child">child node</span>
    var node = TestUtils.renderIntoDocument( <AccordionNode>{child}</AccordionNode> )
    var elems = TestUtils.scryRenderedDOMComponentsWithClass(node, 'child')
    expect( elems.length ).to.eql( 1 )
  })
})
