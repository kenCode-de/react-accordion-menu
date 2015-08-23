var React = window.React || require('react')
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
  render: function(){
    var className = this.state.expanded ? 'expanded' : 'collapsed'
    var children = this.props.children
    return  <ul className={className} onClick={this._onClick}>
              <li>
                {React.Children.map(this.props.children, function(element, idx) {
                  return React.cloneElement(element, { ref: idx })
                })}
              </li>
            </ul>
  },
  _onClick: function(event){
    event.stopPropagation()
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