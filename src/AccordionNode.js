var React = require('react')
var classnames = require('classnames')

var AccordionNode = React.createClass({
  propTypes : {
    expanded: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  },
  getInitialState: function () {
    return {};
  },
  getDefaultProps: function () {
    return {
      expanded: false,
      onClick: function(depth) {
        console.log("AccordionNode clicked: " + depth.join(" > "))
      },
    }
  },
  render: function(){
    var className = this.props.expanded ? 'expanded' : 'collapsed'
    return  <span className={className}>
              I am an AccordionNode
            </span>
  }
})

module.exports = AccordionNode