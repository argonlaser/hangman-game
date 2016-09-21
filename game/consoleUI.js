const Table = require('cli-table')
const Colors = require('colors')
const clearCli = require('cli-clear')
const utils = require('./utils')

Colors.setTheme({
  cWin: 'green',
  cBold: 'bold',
  cLose: 'red',
  cMissed: 'yellow'
})

class consoleUI {
  constructor (input, output) {
    this.input = process.stdin
    this.output = process.stdout
  }

  clearConsole () {
    clearCli()
  }

  render (gameDetails) {
    const self = this
    const hangmanTerm = gameDetails.hangmanWord.term

    self.clearConsole()
    const table = new Table({
      colWidths: utils.initialiseHangmanWordSlot(hangmanTerm.length, 3)
    })

    table.push(gameDetails.tableContent)
    self.output.write(table.toString())
    self.output.write('\nMEANING: ' + gameDetails.hangmanWord.definition)
    self.output.write('\nGUESSED: ' + gameDetails.guessed)
    self.output.write('\nMISSED: ' + gameDetails.missed)
    self.output.write('\nCHANCES: ' + gameDetails.chances)

    switch (gameDetails.gameState) {
      case 1:
        self.output.write('\nYou won !\n'.cWin)
        break
      case 0:
        self.output.write('\nGame over !\n'.cLose)
        break
      default:
        break
    }
  }
}

module.exports = consoleUI
