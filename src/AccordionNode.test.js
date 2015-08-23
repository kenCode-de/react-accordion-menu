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
    var accordion = <AccordionNode>
                      <div className="title">child node</div>
                    </AccordionNode>
    var node = TestUtils.renderIntoDocument( accordion )
    var elems = TestUtils.scryRenderedDOMComponentsWithClass(node, 'title')
    expect( elems.length ).to.eql( 1 )
  })
  it('recursively renders AccordionNodes', function () {
    var accordion = <AccordionNode>
                      <div className="title">child node 1</div>
                      <div className="content">
                        <AccordionNode>
                          <div className="title">child node 2</div>
                        </AccordionNode>
                      </div>
                    </AccordionNode>
    var node = TestUtils.renderIntoDocument( accordion )
    var nodesElems = TestUtils.scryRenderedComponentsWithType(node, AccordionNode)

    expect( nodesElems.length ).to.eql( 2 )

    var childElems = TestUtils.scryRenderedDOMComponentsWithClass(node, 'content')
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
