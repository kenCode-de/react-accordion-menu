(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/saiph/Documents/workspace/React-Accordion/src/AccordionNode.js":[function(require,module,exports){
var React = window.React || require('react')
var noop = function(){}

var AccordionNode = React.createClass({displayName: "AccordionNode",
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
    if( this._isChildNode(event.currentTarget) ){
      return
    }
    this._toggleExpanded()
    this.props.onClick.apply(this, arguments)
  },
  _toggleExpanded: function(){
    this.setState({
      expanded: !this.state.expanded
    })
  },
  _isChildNode: function(node){
    return node !== this.getDOMNode()
  },
  render: function(){
    var className = this.state.expanded ? 'expanded' : 'collapsed'
    var children = this.props.children
    return  React.createElement("ul", {className: className, onClick: this._onClick}, 
              React.createElement("li", null, 
                children
              )
            )
  }
})

module.exports = AccordionNode

},{"react":"react"}],"/Users/saiph/Documents/workspace/React-Accordion/src/index.js":[function(require,module,exports){
window.AccordionNode = require('./AccordionNode')

},{"./AccordionNode":"/Users/saiph/Documents/workspace/React-Accordion/src/AccordionNode.js"}]},{},["/Users/saiph/Documents/workspace/React-Accordion/src/index.js"]);
