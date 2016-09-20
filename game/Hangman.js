'use strict'
const parseJson = require('../parseJson.js')
const fs = require('fs')
const utils = require('./utils')

class HangmanGame {
  constructor (gameOptions) {
    this.chances = 7
    this.gameState = -1
    this.currentScore = 0
    this.guessed = []
    this.missed = []
    this.resultFile = gameOptions.resultFile
    this.hangmanWord = this.getRandomHangmanWord(gameOptions.datasrcFile)
    this.initHangmanTable()
    this.initHighScore(gameOptions.resultFile)
  }

  initHangmanTable () {
    this.tableContent = utils.initialiseHangmanWordSlot(this.hangmanWord.term.length, '_')
  }

  getRandomHangmanWord (fileName) {
    const wordsJson = parseJson(fileName)
    return wordsJson[Math.floor(Math.random() * wordsJson.length)]
  }

  initHighScore (resultFile) {
    this.highestScore = this.readHighestScore(resultFile)
  }

  readHighestScore (resultFile) {
    try {
      const result = fs.readFileSync(resultFile).toString()
      return result.duration
    } catch (err) {
      return 0
    }
  }

  getGameState () {
    const chances = this.chances
    const tableContent = this.tableContent
    if (tableContent.indexOf('_') <= -1 && chances >= 0) {
      this.gameState = 1
      this.duration = Date.now() - this.startTime
    }
    if (chances <= 0) {
      this.gameState = 0
    }

    return this.gameState
  }

  getScore () {
    return this.duration
  }

  saveScore () {
    var result = this.hangmanWord
    result.duration = this.duration
    try {
      fs.writeFileSync(this.resultFile, JSON.stringify(result))
    } catch (err) {
      console.error('File exception : ' + err)
    }
  }

  guessKey (keyGuessed) {
    var self = this
    const hangmanTerm = self.hangmanWord.term
    if (!hangmanTerm.includes(keyGuessed)) {
      if (self.missed.indexOf(keyGuessed) <= -1) {
        self.missed.push(keyGuessed)
        self.chances--
      }

      if (self.chances <= 0) {
        self.tableContent = hangmanTerm.split('')
      }

      return false
    } else {
      const indicesFound = utils.charPos(hangmanTerm, keyGuessed)
      indicesFound.forEach(function (index) {
        self.tableContent[index] = keyGuessed
        if (self.guessed.indexOf(keyGuessed) <= -1) {
          self.guessed.push(keyGuessed)
        }
      })


      return true
    }
  }

  init () {
    return this.getDetails()
  }

  getDetails () {
    return {
      tableContent : this.tableContent,
      hangmanWord : this.hangmanWord,
      gameState : this.getGameState(),
      guessed : this.guessed,
      missed : this.missed,
      chances : this.chances
    }
  }

  nextTurn (key) {
    const self = this
    const singleAlphaRegex = /^[a-zA-Z]$/

    if (!singleAlphaRegex.test(key)) {
      return self.getDetails()
    }

    const isRightGuess = self.guessKey(key)
    return self.getDetails()
  }
}

module.exports = HangmanGame
