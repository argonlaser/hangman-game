'use strict'
const parseJson = require('../parseJson.js')
const Colors = require('colors')
const keypress = require('keypress')
const Table = require('cli-table')
const clearCli = require('cli-clear')
const fs = require('fs')

Colors.setTheme({
  success: 'green',
  b: 'bold',
  fail: 'red'
})

class HangmanGame {
  constructor (gameOptions) {
    this.chances = 7
    this.gameState = -1
    this.currentScore = 0
    this.resultFile = gameOptions.resultFile
    this.hangmanWord = this.getRandomHangmanWord(gameOptions.datasrcFile)
    this.initIOStream(gameOptions.input, gameOptions.output)
    this.initHangmanTable()
    this.initHighScore(this.resultFile)

    if (typeof gameOptions.onInit === 'function') {
      gameOptions.onInit()
    }

    // console.log('word is ' + JSON.stringify(this.hangmanWord))
  }

  initHangmanTable () {
    this.tableContent = this._initialiseHangmanWordSlot(this.hangmanWord.term.length, '_')
  }

  getRandomHangmanWord (fileName) {
    const wordsJson = parseJson(fileName)
    return wordsJson[Math.floor(Math.random() * wordsJson.length)]
  }

  initIOStream (input, output) {
    this.input = input
    this.output = output
    this.input.setRawMode(true)
    keypress(this.input)
  }

  initHighScore (resultFile) {
    this.highestScore = this.readHighestScore(resultFile)
  }

  charPos (str, char) {
    return str.split('').map(function (c, i) {
      if (c === char) return i
    }).filter(function (v) {
      return v >= 0
    })
  }

  readHighestScore (resultFile) {
    try {
      const result = fs.readFileSync(resultFile).toString()
      return result.duration
    } catch (err) {
      return 0
    }
  }

  clear () {
    clearCli()
  }

  _initialiseHangmanWordSlot (size, value) {
    const array = []
    while (size--) array[size] = value
    return array
  }

  getResult () {
    const chances = this.chances
    const tableContent = this.tableContent
    if (tableContent.indexOf('_') <= -1 && chances >= 0) {
      this.gameState = 1
      this.duration = Date.now() - this.startTime
    }
    if (chances <= 0) {
      this.gameState = 0
    }
    //    console.log('Get Result :' + tableContent)
    //    console.log('Get Result Index :' + tableContent.indexOf('_'))
    //    console.log('Get result chances :' + chances)
    //    console.log('Game State :' + this.gameState)
    return this.gameState
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

  render () {
    const self = this
    const hangmanTerm = self.hangmanWord.term
    self.clear()

    const table = new Table({
      colWidths: this._initialiseHangmanWordSlot(hangmanTerm, 3)
    })
    table.push(self.tableContent)
    const result = self.getResult()
    console.log(table.toString())
    console.log('MEANING: ' + self.hangmanWord.definition)
    switch (result) {
      case 1:
        self.output.write('\nYou won'.success)
        this.saveScore()
        process.exit(0)
        break
      case 0:
        self.output.write('\nGame over !'.fail)
        process.exit(0)
        break
    }
  }

  guessKey (keyGuessed) {
    var self = this
    const hangmanTerm = self.hangmanWord.term
    if (!hangmanTerm.includes(keyGuessed)) {
      self.chances--
      if (self.chances <= 0) {
        self.tableContent = hangmanTerm.split('')
      }

      return false
    } else {
      const indicesFound = self.charPos(hangmanTerm, keyGuessed)
      indicesFound.forEach(function (index) {
        self.tableContent[index] = keyGuessed.success
      })

      return true
    }
  }

  start () {
    const self = this
    const singleAlphaRegex = /^[a-zA-Z]$/
    this.startTime = Date.now()
    self.render()
    self.input.on('keypress', function (ch, key) {
      if (!key || !singleAlphaRegex.test(key.name.toString())) {
        return
      }

      self.guessKey(key.name)
      self.render()
    })
  }

  nextTurn (key, correctGuess, wrongGuess) {
    const self = this
    const singleAlphaRegex = /^[a-zA-Z]$/

    if (!key || !singleAlphaRegex.test(key)) {
      return
    }

    const isRightGuess = self.guessKey(key)
    if (isRightGuess) {
      if (typeof correctGuess === 'function') {
        correctGuess()
      }
    } else {
      if (typeof wrongGuess === 'function') {
        wrongGuess()
      }
    }
  }
}

module.exports = HangmanGame
