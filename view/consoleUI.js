'use strict'
const Table = require('cli-table')
const Colors = require('colors')
const clearCli = require('./consoleClear')
const utils = require('../utils/utils')
const HighScoreStore = require('../game/HighScoreStore')

Colors.setTheme({
  cWin: 'green',
  cBold: 'bold',
  cLose: 'red',
  cMissed: 'yellow',
  cGuessed: 'green',
  cMeaning: 'cyan',
  cChances: 'magenta',
  cTerm: 'yellow'
})

class consoleUI {
  constructor (input, output) {
    this.input = process.stdin
    this.output = process.stdout
  }

  printHighScore () {
    const highScoreStore = new HighScoreStore()
    const highScore = highScoreStore.fetch()

    this.output.write('\nHIGHSCORE : ' + utils.formatTime(highScore.duration).cBold.cWin)
    this.output.write('\nYOUR WORD : ' + highScore.term.cTerm)
    this.output.write('\nYOUR MEANING : ' + highScore.definition.cMeaning)
  }

  clearConsole () {
    clearCli()
  }

  write (data) {
    const self = this
    self.output.write(data)
  }

  render (gameDetails) {
    const self = this
    const hangmanTerm = gameDetails.hangmanWord.term

    self.clearConsole()
    const table = new Table({
      colWidths: utils.initialiseHangmanWordSlot(hangmanTerm.length, 3)
    })

    table.push(gameDetails.tableContent)
    self.write(table.toString().cGuessed)
    self.write('\nMEANING: ' + gameDetails.hangmanWord.definition.cMeaning)
    self.write('\nGUESSED: ' + gameDetails.guessed.toString().cGuessed)
    self.write('\nMISSED: ' + gameDetails.missed.toString().cMissed)
    self.write('\nCHANCES: ' + gameDetails.chances.toString().cChances)

    switch (gameDetails.gameState) {
      case 1:
        self.write('\nYou won !\n'.cWin)
        break
      case 0:
        self.write('\nGame over !\n'.cLose)
        break
      default:
        break
    }
  }
}

module.exports = consoleUI
