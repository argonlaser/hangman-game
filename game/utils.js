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

module.exports = utils
