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
