#!/usr/bin/env node

const HangmanGame = require('./game/Hangman')
const program = require('commander')
const keypress = require('keypress')
const gameOptions = require('./gameConfig/config')
const ConsoleUI = require('./view/consoleUI')
const HighScoreStore = require('./game/HighScoreStore')

const consoleUI = new ConsoleUI(process.stdin, process.stdout)

var game = null
var gameDetails = null

program
  .version('0.0.1')
  .option('-g, --gre', 'displays a word from gre words')
  .option('-f, --freq', 'displays a word from high frequency gre words')
  .option('-s, --score', 'displays your highScore')
  .parse(process.argv)

if (program.freq) {
  game = new HangmanGame(gameOptions[0])
} else if (program.gre) {
  game = new HangmanGame(gameOptions[1])
} else if (program.score) {
  consoleUI.printHighScore()
  process.exit(0)
} else {
  // Default is high frequency game
  game = new HangmanGame(gameOptions[0])
}

consoleUI.render(game.init())

keypress(process.stdin)
process.stdin.setRawMode('true')

process.stdin.on('keypress', function (ch, key) {
  if (!key || !key.name) {
    return
  }

  if (key && key.ctrl && key.name === 'c') {
    process.exit(0)
  }

  gameDetails = game.nextTurn(key.name)
  consoleUI.render(gameDetails)

  if (gameDetails.gameState === 1) {
    const highScore = new HighScoreStore(gameDetails)
    highScore.save()
    process.exit(0)
  } else if (gameDetails.gameState === 0) {
    process.exit(0)
  }
})
