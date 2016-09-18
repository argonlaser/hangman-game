#!/usr/bin/env node
'use strict';

const HangmanGame = require('./game/Hangman');
const hangmanHFwordsFile = './data/hf_words.json';
const hangmanGREwordsFile = './data/gre_words.json';
const resultFile = './results/result.txt';
const program = require('commander');
let game = null;

const gameOptions = 
      [
        {
          input:process.stdin,
          output: process.stdout,
          datasrcFile:hangmanHFwordsFile,
          resultFile:resultFile
        },
        {
          input:process.stdin,
          output: process.stdout,
          datasrcFile:hangmanGREwordsFile,
          resultFile:resultFile
        }
      ];

program
  .version('0.0.1')
  .option('-g, --gre', 'Shows gre words')
  .option('-f, --freq', 'Shows frequent gre words')
  .parse(process.argv);

 if (program.freq) {
  game = new HangmanGame(gameOptions[0]);
  
} else if (program.gre) {
    game = new HangmanGame(gameOptions[1]);
} else {
  // Default is high frequency game
    game = new HangmanGame(gameOptions[0]);
}

game.start();

process.stdin.on('keypress', function(ch, key) {
  if (key && key.ctrl && key.name == 'c') {
    process.exit(0);
  }
});
