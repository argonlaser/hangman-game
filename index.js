#!/usr/bin/env node

const HangmanGame = require('./game/Hangman');
const hangmanHFwordsFile = './data/hf_words.json';

// TO-DO generate Gameoptions JSON that can be pluggable
// and extendable and pass it to class.
const game = new HangmanGame(process.stdin, process.stdout, hangmanHFwordsFile);

game.start();