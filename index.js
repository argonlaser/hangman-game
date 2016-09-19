#!/usr/bin/env node
'use strict'

const HangmanGame = require('./game/Hangman')
const program = require('commander')
const gameOptions = require('./game/config')
let game = null

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
      console.log('render for correct guess')
    },
    function () {
      // wrong Guess
      console.log('render for wrong guess')
    }
  )
})
