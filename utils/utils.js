var utils = {}

utils.initialiseHangmanWordSlot = function (size, value) {
  var array = []
  while (size--) array[size] = value
  return array
}

utils.charPos = function (str, char) {
  return str.split('').map(function (c, i) {
    if (c === char) return i
  }).filter(function (v) {
    return v >= 0
  })
}
utils.formatTime = function (ms) {
  var x = ms / 1000
  var seconds = Math.floor(x % 60)
  x /= 60
  var minutes = Math.floor(x % 60)
  x /= 60
  var hours = Math.floor(x % 24)
  x /= 24
  return hours + 'h, ' + minutes + 'm, ' + seconds + 's'
}

module.exports = utils
