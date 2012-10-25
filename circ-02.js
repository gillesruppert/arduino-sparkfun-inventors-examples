var five = require("johnny-five");
var board = new five.Board();
var ledPins = [2, 3, 4, 5, 6, 7, 8, 9];
var OUTPUT = 1;
var ledOn;
var ledOff;

board.on("ready", function() {
  ledPins.forEach(function(pin, i) {
    this.pinMode(pin, OUTPUT);
  }, this);

  ledOn = (function ledOn(ledPin) {
    this.digitalWrite(ledPin, 1);
  }).bind(this);

  ledOff = (function ledOff(ledPin) {
    this.digitalWrite(ledPin, 0);
  }).bind(this);

  this.loop(2000, function() {
    //oneAfterAnother();
    oneAtATime()
  });
});

function oneAfterAnother() {
  var pin = 0;
  var t;

  function up() {
    ledOn(ledPins[pin]);
    pin++;
    t = setTimeout(up, 100);
    if (pin === ledPins.length) {
      clearTimeout(t);
      setTimeout(down, 100);
    }
  }

  function down() {
    pin--;
    ledOff(ledPins[pin]);

    t = setTimeout(down, 100);
    if (pin <= 0) clearTimeout(t);
  }

  up()
}

function oneAtATime() {
  var pin = 0;
  var up = true;
  var t;

  function next(pin) {
    ledOn(ledPins[pin]);
    if (pin - 1 >= 0) ledOff(ledPins[pin - 1]);
    pin++;

    t = setTimeout(function() {
      next(pin);
    }, 100);
    if (pin === ledPins.length) {
      clearTimeout(t);
      previous(--pin);
    }
  }

  function previous(pin) {
    ledOn(ledPins[pin]);
    if (pin + 1 < ledPins.length) ledOff(ledPins[pin + 1]);
    pin--;

    t = setTimeout(function() {
      previous(pin);
    }, 100);

    if (pin === -1) clearTimeout(t);
  }

  next(pin);
}
