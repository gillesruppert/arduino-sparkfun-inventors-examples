Arduino Sparkfun Inventor's Kit Examples
========================================

JavaScript implementations of the Sparkfun Inventor's Kit circuit examples, 
using Johnny-Five.

## installation
1. clone the repo
2. run `npm install`
3. execute the example of choice, i.e. `node circ-01`

## troubleshooting
CIRC-03 of the sparkfun inventor's kit has a mistake in it:
Rather than using the 10k Ohm resistor, use the 330 Ohm instead.
Also make sure that you actually use the transistor and not the temperature
sensor as they look the same!
