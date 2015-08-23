var React = window.React || require('react')
var classnames = require('classnames')

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
      onClick: function() {
        console.log("AccordionNode clicked")
      },
    }
  },
  _onClick: function(){
    this.setState({
      expanded: !this.state.expanded
    })
    this.props.onClick.apply(this, arguments)
  },
  render: function(){
    var className = this.state.expanded ? 'expanded' : 'collapsed'
    return  <span className={className} onClick={this._onClick}>
              I am an AccordionNode
            </span>
  }
})

module.exports = AccordionNode