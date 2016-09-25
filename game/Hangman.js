'use strict'
const parseJson = require('../parseJson.js')
const utils = require('../utils/utils')

class HangmanGame {
  constructor (gameOptions) {
    this.chances = gameOptions.chances || 7
    this.gameState = -1
    this.guessed = []
    this.missed = []
    this.resultFile = gameOptions.resultFile
    this.hangmanWord = this.getRandomHangmanWord(gameOptions.datasrcFile)
    this.initHangmanTable()

    if (typeof gameOptions.onInit === 'function') {
      gameOptions.onInit()
    }
  }

  initHangmanTable () {
    this.tableContent = utils.initialiseHangmanWordSlot(this.hangmanWord.term.length, '_')
  }

  getRandomHangmanWord (fileName) {
    const wordsJson = parseJson(fileName)
    return wordsJson[Math.floor(Math.random() * wordsJson.length)]
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
    this.startTime = Date.now()
    return this.getDetails()
  }

  getDetails () {
    return {
      tableContent: this.tableContent,
      hangmanWord: this.hangmanWord,
      gameState: this.getGameState(),
      guessed: this.guessed,
      missed: this.missed,
      chances: this.chances,
      duration: this.duration,
      resultFile: this.resultFile
    }
  }

  nextTurn (key) {
    const self = this
    const singleAlphaRegex = /^[a-zA-Z]$/

    if (!singleAlphaRegex.test(key)) {
      return self.getDetails()
    }

    self.guessKey(key)
    return self.getDetails()
  }
}

module.exports = HangmanGame
