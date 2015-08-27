(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var MicroEvent = require('./MicroEvent')

function AccordionEvents(){
  MicroEvent.call(this)
  this.on('click:node', function(node){
    this.emit('reset', node)
  }.bind(this))
}
AccordionEvents.prototype = MicroEvent.prototype

module.exports = new AccordionEvents

},{"./MicroEvent":4}],2:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null)
var noop = function(){}
var AccordionEvents = require('./AccordionEvents')
var AccordionUtils = require('./AccordionUtils')

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
    return  React.createElement("ul", {className: className, onClick: this._onClick}, 
              React.createElement("li", null, 
                children
              )
            )
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AccordionEvents":1,"./AccordionUtils":3}],3:[function(require,module,exports){
module.exports = {
  isSiblingOf: isSiblingOf,
}


function isSiblingOf(node, testNode){
  var result = false
  var siblings = getSiblings(node)
  siblings.forEach(function(sibling){
    if( sibling === testNode ){
      result = true
    }
  })
  return result
}

function getChildren(node, skipMe){
  var children = []
  for ( ; node; node = node.nextSibling ) {
    if ( node.nodeType == 1 && node != skipMe){
      children.push( node )
    }
  }
  return children
}

function getSiblings(node) {
  return getChildren(node.parentNode.firstChild, node)
}

},{}],4:[function(require,module,exports){
/*
adapted from

https://github.com/jeromeetienne/microevent.js
*/

var MicroEvent  = function(){};
MicroEvent.prototype.on = function(event, fct){
  this._events = this._events || {};
  this._events[event] = this._events[event] || [];
  this._events[event].push(fct);
}
MicroEvent.prototype.off = function(event, fct){
  this._events = this._events || {};
  if( event in this._events === false  )  return;
  this._events[event].splice(this._events[event].indexOf(fct), 1);
}
MicroEvent.prototype.emit = function(event /* , args... */){
  this._events = this._events || {};
  if( event in this._events === false  )  return;
  for(var i = 0; i < this._events[event].length; i++){
    this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
  }
}

module.exports  = MicroEvent;

},{}],5:[function(require,module,exports){
window.AccordionNode = require('./AccordionNode')

},{"./AccordionNode":2}]},{},[5]);
