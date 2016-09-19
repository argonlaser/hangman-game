#!/usr/bin/env node
'use strict'

const HangmanGame = require('./game/Hangman')
const program = require('commander')
const gameOptions = require('./game/config')
const HangmanArt = require('hangman-cli-art')
const axel = require('axel')

let game = null
const hangmanArt = new HangmanArt({
  marginX: 5,
  marginY: 5
})

program
  .version('0.0.1')
  .option('-g, --gre', 'Shows gre words')
  .option('-f, --freq', 'Shows frequent gre words')
  .parse(process.argv)

if (program.freq) {
  game = new HangmanGame(gameOptions[0])
} else if (program.gre) {
  game = new HangmanGame(gameOptions[1])
} else {
  // Default is high frequency game
  game = new HangmanGame(gameOptions[0])
}
// game.start()

process.stdin.on('keypress', function (ch, key) {
  if (!key) {
    return
  }
  if (!key.name) {
    return
  }
  if (key.ctrl && key.name === 'c') {
    process.exit(0)
  }

  game.nextTurn(
    key.name.toString(),
    function () {
      // correct Guess
      axel.text(5, 60, JSON.stringify(this.tableContent))
    },
    function () {
      // wrong Guess
      hangmanArt.next()
    }
  )
})
