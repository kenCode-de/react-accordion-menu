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

  describe('on click', function () {
    it('expands only parent node / does not propagate event down to children', function () {
      var accordion = <AccordionNode>
                        <div className="title">title</div>
                        <div className="content">
                          <AccordionNode>
                            <div className="title">child title</div>
                          </AccordionNode>
                        </div>
                      </AccordionNode>
      var element = TestUtils.renderIntoDocument( accordion )
      var accordionParentNode = element.getDOMNode()
      TestUtils.Simulate.click( accordionParentNode )
      expect( accordionParentNode.getAttribute('class') ).to.match(/expanded/)
      var accordionChildNode = accordionParentNode.querySelector('ul')
      expect( accordionChildNode.getAttribute('class') ).to.match(/collapsed/)
    })
  })
})
