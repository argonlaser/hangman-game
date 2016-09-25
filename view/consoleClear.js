// var mode = 438; /* mode=438 */
module.exports = function () {
  process.stdout.write('\033[0m\033[1J');
  process.stdout.write('\033[0;0H');
}
