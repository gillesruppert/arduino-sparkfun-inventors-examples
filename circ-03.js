var five = require("johnny-five");
var delay = require("./delay");
var board = new five.Board();
var MODES; // needs to be assigned once the board is ready

var motorPin = 9;

board.on("ready", function() {
  MODES = board.firmata.MODES;
  this.pinMode(motorPin, MODES.PWM);

  this.loop(4500, function() {
    motorOnThenOffWithSpeed();
  });
  //  motorAcceleration(); // outside of the loop
});

var motorOnThenOffWithSpeed = function motorOnThenOffWithSpeed () {
  var onSpeed = 200;
  var onTime = 2500;

  var offSpeed = 50;
  var offTime = 1000;

  this.analogWrite(motorPin, onSpeed);
  delay(onTime);
  this.analogWrite(motorPin, offSpeed);
  delay(offTime);
}.bind(board);

var motorAcceleration = function motorAcceleration() {
  var that = this;
  var t;
  var speed = 0;
  function accelerate() {
    that.analogWrite(motorPin, speed);
    speed += 1;
    t = setTimeout(accelerate, 50);
    if (speed > 255) {
      clearTimeout(t);
      deccelerate();
    }
  }

  function deccelerate() {
    that.analogWrite(motorPin, speed);
    speed -= 1;
    t = setTimeout(deccelerate, 20);
    if (speed < 0) clearTimeout(t);
  }

  accelerate();
}.bind(board);
