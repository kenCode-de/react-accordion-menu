var React = window.React || require('react')
var classnames = require('classnames')
var noop = function(){}

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
  _onClick: function(event){
    event.stopPropagation()
    if( event.currentTarget !== this.getDOMNode() ){
      return
    }
    this.setState({
      expanded: !this.state.expanded
    })
    this.props.onClick.apply(this, arguments)
  },
  render: function(){
    var className = this.state.expanded ? 'expanded' : 'collapsed'
    var children = this.props.children
    return  <ul className={className} onClick={this._onClick}>
              <li>
                {children}
              </li>
            </ul>
  }
})

module.exports = AccordionNode