var five = require("johnny-five");
var board = new five.Board();
var ledPin = 13;
var OUTPUT = 1;

board.on("ready", function() {
  this.pinMode(ledPin, OUTPUT);
  var val = 0;

  this.loop(1000, function() {
    this.digitalWrite(ledPin, toggle());
  });
});

var toggle = (function() {
  var val = 0;
  return function toggle() {
    return (val = val ? 0 : 1);
  }
}());
