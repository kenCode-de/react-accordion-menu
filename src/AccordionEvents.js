var EventEmitter = require('events').EventEmitter

function AccordionEvents(){
  EventEmitter.call(this)
  this.setMaxListeners(100)
  this.on('click:node', function(node){
    this.emit('reset', node)
  }.bind(this))
}
AccordionEvents.prototype = EventEmitter.prototype

module.exports = new AccordionEvents