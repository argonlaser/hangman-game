const hangmanHFwordsFile = './data/hf_words.json'
const hangmanGREwordsFile = './data/gre_words.json'
const resultFile = './results/results.json'
const axel = require('axel')

function initGameUI () {
  axel.clear()
  axel.brush = '.'
  console.log()
}

const gameOptions =
  [
    {
      name: 'hf_words',
      input: process.stdin,
      output: process.stdout,
      datasrcFile: hangmanHFwordsFile,
      resultFile: resultFile,
      onInit: function () {
        initGameUI()
        axel.text(5, 60, JSON.stringify(this.tableContent))
        // Initialise all game related resources here
      },
      onEnd: function () {
        // Save all game related resources here
      }
    },
    {
      name: 'gre_words',
      input: process.stdin,
      output: process.stdout,
      datasrcFile: hangmanGREwordsFile,
      resultFile: resultFile,
      onInit: function () {
        initGameUI()
        // Initialise all game related resources here
      },
      onEnd: function () {
        // Save all game related resources here
      }
    }
  ]

module.exports = gameOptions
