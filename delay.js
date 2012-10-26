module.exports = function delay(ms) {
  var future = Date.now() + ms;
  while (Date.now() < future) ;
};
