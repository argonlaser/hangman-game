'use strict';
const parseJson = require('../parseJson.js')
  , Colors = require('colors')
  , keypress = require('keypress')
  , Table = require('cli-table')
  , clearCli = require('cli-clear')
  , fs = require('fs');

Colors.setTheme({
  success: 'green',
  b: 'bold',
  fail: 'red'
});

class HangmanGame {
  constructor(input, output, fileName) {
    this.chances = 7;
    this.gameState = -1;
    this.hangmanWord = this.getRandomHangmanWord(fileName);
    this.initIOStream(input, output);
    this.initHangmanTable();
    this.initHighScore('./results/results.txt');
  }

  initHangmanTable() {
    this.tableContent = this._initialiseHangmanWordSlot(this.hangmanWord.term.length, '_');
  }

  getRandomHangmanWord(fileName) {
    const wordsJson = parseJson(fileName);
    return wordsJson[Math.floor(Math.random() * wordsJson.length)];
  }

  initIOStream(input, output) {
    this.input = input;
    this.output = output;
    this.input.setRawMode(true);
    keypress(this.input);
  }

  initHighScore(input, output) {
    this.currentScore = 0;
    this.highestScore = this.readHighestScore('./results/results.txt');
  }

  charPos(str, char) {
    return str.split('').map(function (c, i) {
      if (c == char) return i;
    }).filter(function (v) {
      return v >= 0;
    });
  }

  readHighestScore(resultsFile) {
    try {
      return parseInt(FS.readFileSync(resultsFile).toString());
    }
    catch (err) {
      return 0;
    }
  }

  clear() {
    clearCli();
  }
  
  _initialiseHangmanWordSlot(size, value) {
    const array = [];
    while (size--) array[size] = value;
    return array;
  }

  getResult() {
    const chances = this.chances;
    const tableContent = this.tableContent;
    console.log('Get Result :' + tableContent);
    console.log('Get Result Index :' + tableContent.indexOf('_'));
    console.log('Get result chances :' + chances);
    console.log('Game State :' + this.gameState);
    if (tableContent.indexOf('_') <= -1 && chances >= 0) {
      this.gameState = 1;
    }
    if (chances <= 0) {
      this.gameState = 0;
    }
    return this.gameState;
  }

  saveScore() {
    if (this.currScore > this.highestScore) {
      FS.writeFileSync('./results/results.txt', this.score.toString());
    }
  }

  render() {
    const self = this;
    const hangmanTerm = self.hangmanWord.term;
    self.clear();
    console.log('chances: ' + self.chances);
    const table = new Table({
      colWidths: this._initialiseHangmanWordSlot(hangmanTerm, 3)
    });
    table.push(self.tableContent);
    const result = self.getResult();
    console.log('Result : ' + result)
    this.saveScore();
    console.log(table.toString());
    console.log('MEANING: ' + self.hangmanWord.definition)
    switch (result) {
    case 1:
      self.output.write('\nYou won'.success);
      process.exit(0);
      break;
    case 0:
      self.output.write('\nGame over !'.fail);
      process.exit(0);
      break;
    }
  }

  updateGame(keyGuessed) {
    var self = this;
    const hangmanTerm = self.hangmanWord.term;
    if (!hangmanTerm.includes(keyGuessed)) {
      self.chances--;
      if (self.chances <= 0) {
        self.tableContent = hangmanTerm.split('');
      }
    }
    else {
      const indicesFound = self.charPos(hangmanTerm, keyGuessed);
      indicesFound.forEach(function (index) {
        self.tableContent[index] = keyGuessed;
      });
    }
  }
  
  start() {
    const self = this;
    const singleAlphaRegex = /^[a-zA-Z]$/;
    self.render();
    self.input.on('keypress', function (ch, key) {
      if (!singleAlphaRegex.test(key.name.toString())) {
        return;
      }
      if (key && key.ctrl && key.name == 'c') {
        console.log('Magilchi !');
        process.exit(0);
      }
      self.updateGame(key.name);
      self.render();
    });
  }
};

module.exports = HangmanGame;