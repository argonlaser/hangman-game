const hangmanHFwordsFile = './data/hf_words.json'
const hangmanGREwordsFile = './data/gre_words.json'
const resultFile = './results.json'

const gameOptions =
  [
    {
      name: 'hf_words',
      input: process.stdin,
      output: process.stdout,
      datasrcFile: hangmanHFwordsFile,
      resultFile: resultFile,
      onInit: function () {
        // Initialise all game related external resources here
      }
    },
    {
      name: 'gre_words',
      input: process.stdin,
      output: process.stdout,
      datasrcFile: hangmanGREwordsFile,
      resultFile: resultFile,
      onInit: function () {
        // Initialise all game related external resources here
      }
    }
  ]

module.exports = gameOptions
