var five = require("johnny-five");
var board = new five.Board();
var delay = require("./delay");
var HIGH, LOW, MODES;
var MSBFIRST = 1;

var data = 2;
var clock = 3;
var latch = 4;

var ledState = 0;
var ON = 1;
var OFF = 0;

board.on("ready", function() {
  MODES = this.firmata.MODES;
  HIGH = this.firmata.HIGH;
  LOW = this.firmata.LOW;

  this.pinMode(data, MODES.OUTPUT);
  this.pinMode(clock, MODES.OUTPUT);
  this.pinMode(latch, MODES.OUTPUT);

  var counter = 0;
  var t;

  (function looper() {
    updateLeds(counter);
    counter++;
    t = setTimeout(looper, 100);
    if (counter === 256) clearTimeout(t);
  }());
});

var updateLeds = function updateLeds (value) {
  this.digitalWrite(latch, LOW);
  this.shiftOut(data, clock, MSBFIRST, value);
  this.digitalWrite(latch, HIGH);
}.bind(board);
