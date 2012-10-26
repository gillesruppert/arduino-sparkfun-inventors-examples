var five = require("johnny-five");
var board = new five.Board();
var MODES;

var servoPin = 9;
var servo;

board.on("ready", function() {
  MODES = board.firmata.MODES;

  servo = new five.Servo(servoPin);
  servo.on("move", function( e, degrees ) {
    if (e != null) throw e;
    console.log("move", degrees);
  });

  board.repl.inject({ servo: servo });

  this.loop(2000, function() {
    servo.move(0, true);
    setTimeout(function () {
      servo.move(180, true);
    }, 500);
  });

});

