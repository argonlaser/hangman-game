#!/usr/bin/env node
'use strict'

const HangmanGame = require('./game/Hangman')
const program = require('commander')
const gameOptions = require('./game/config')
const HangmanArt = require('hangman-cli-art')
const axel = require('axel')

let game = null
const hangmanArt = new HangmanArt({
  marginX: 60,
  marginY: 5
})

axel.brush = '.'
axel.line(0, 0, 110, 0)
axel.line(0, 0, 0, 50)
axel.line(110, 0, 110, 50)
axel.line(0, 50, 110, 50)

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
  if (key && key.ctrl && key.name === 'c') {
    process.exit(0)
  }

  game.nextTurn(
    key.name,
    function () {
      // correct Guess
      axel.text(10, 10, key.name)
    },
    function () {
      // wrong Guess
      hangmanArt.next()
    }
  )
})
