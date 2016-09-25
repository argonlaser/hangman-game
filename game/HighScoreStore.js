'use strict'
const fs = require('fs')
const path = require('path')

class HighScoreStore {
  constructor (options) {
    this.resultFile = (options && options.resultFile) || path.join(__dirname, '../results.json')
    this.hangmanWord = options && options.hangmanWord
    this.duration = options && options.duration
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
    try {
      const result = fs.readFileSync(this.resultFile).toString()
      return JSON.parse(result)
    } catch (err) {
      return {
        duration: Number.MAX_SAFE_INTEGER
      }
    }
  }

  getDuration () {
    return this.fetch().duration
  }
}

module.exports = HighScoreStore
