var MicroEvent = require('./MicroEvent')

function AccordionEvents(){
  MicroEvent.call(this)
  this.on('click:node', function(node){
    this.emit('reset', node)
  }.bind(this))
}
AccordionEvents.prototype = MicroEvent.prototype

module.exports = new AccordionEvents