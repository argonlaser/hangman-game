'use strict'
const fs = require('fs')

class HighScoreStore {
  constructor (options) {
    this.resultFile = options.resultFile
    this.hangmanWord = options.hangmanWord
    this.duration = options.duration
    this.highScore = this.getDuration()
  }
  save () {
    var result = this.hangmanWord
    result.duration = this.duration
    try {
      if (this.duration < this.highScore) {
        fs.writeFileSync(this.resultFile, JSON.stringify(result), 'utf8')
      }
    } catch (err) {
      console.error('File exception : ' + err)
    }
  }

  fetch () {
    return JSON.stringify({
      resultFile: this.resultFile,
      hangmanWord: this.hangmanWord,
      highScore: this.highScore
    })
  }
  getDuration () {
    try {
      const result = fs.readFileSync(this.resultFile).toString()
      return result.duration
    } catch (err) {
      return Number.MAX_SAFE_INTEGER
    }
  }
}

module.exports = HighScoreStore
