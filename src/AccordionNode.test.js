var React = require('react')
require('react/addons')
var TestUtils = React.addons.TestUtils

var AccordionNode = require('./AccordionNode.js')
describe('AccordionNode', function () {
  it('is collapsed by default', function () {
    var node = TestUtils.renderIntoDocument( <AccordionNode/>)
    var elem = TestUtils.findRenderedDOMComponentWithTag(node, 'ul').getDOMNode()
    expect( elem.getAttribute('class') ).to.match(/collapsed/)
  })
  it('when clicked becomes expanded', function () {
    var node = TestUtils.renderIntoDocument( <AccordionNode/>)
    var elem = TestUtils.findRenderedDOMComponentWithTag(node, 'ul').getDOMNode()
    TestUtils.Simulate.click(elem)
    expect( elem.getAttribute('class') ).to.match(/expanded/)
  })
  it('renders children', function () {
    var child = <span className="child">child node</span>
    var node = TestUtils.renderIntoDocument( <AccordionNode>{child}</AccordionNode> )
    var elems = TestUtils.scryRenderedDOMComponentsWithClass(node, 'child')
    expect( elems.length ).to.eql( 1 )
  })
  it('recursively renders AccordionNodes', function () {
    var child = <AccordionNode>
                  <span className="child">child node</span>
                </AccordionNode>
    var node = TestUtils.renderIntoDocument( <AccordionNode>{child}</AccordionNode> )
    var nodesElems = TestUtils.scryRenderedComponentsWithType(node, AccordionNode)

    expect( nodesElems.length ).to.eql( 2 )

    var childElems = TestUtils.scryRenderedDOMComponentsWithClass(node, 'child')
    expect( childElems.length ).to.eql( 1 )
  })
})
