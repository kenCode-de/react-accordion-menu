var EventEmitter = require('events').EventEmitter
var util = require('util')


function AccordionEvents(){
  EventEmitter.call(this)
  this.setMaxListeners(100)
  this.on('click:node', function(node){
    this.emit('reset', node)
  }.bind(this))
}
util.inherits(AccordionEvents, EventEmitter)

module.exports = new AccordionEvents