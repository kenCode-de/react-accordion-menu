var React = require('react')
var noop = function(){}
var AccordionEvents = require('./AccordionEvents')
var AccordionUtils = require('./AccordionUtils')

var AccordionNode = React.createClass({
  propTypes : {
    expanded: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  },
  getInitialState: function(){
    return {
      expanded: !!this.props.expanded
    }
  },
  getDefaultProps: function(){
    return {
      expanded: false,
      onClick: noop,
    }
  },
  componentWillMount: function(){
    AccordionEvents.on('reset', function(node){
      var _isSibling = AccordionUtils.isSiblingOf(node.getDOMNode(), this.getDOMNode())

      if( _isSibling ){
        this.setState({
          expanded: false
        })
      }
    }.bind(this))
  },
  render: function(){
    var className = 'accordion '
    className += this.props.className + ' '
    className += this.state.expanded ? 'expanded' : 'collapsed'
    var children = this.props.children
    return  <ul className={className} onClick={this._onClick}>
              <li>
                {children}
              </li>
            </ul>
  },
  _onClick: function(event){
    event.stopPropagation()
    AccordionEvents.emit('click:node', this)
    this._toggleExpanded()
    this.props.onClick.apply(this, arguments)
  },
  _toggleExpanded: function(){
    this.setState({
      expanded: !this.state.expanded
    })
  },
})

module.exports = AccordionNode
