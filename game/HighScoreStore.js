const fs = require('fs')

class HighScoreStore {
  constructor (options) {
    this.resultFile = options.resultFile
    this.hangmanWord = options.hangmanWord
    this.duration = options.duration
    this.highScore = this.getDuration()
  }
  save () {
    console.log('SAVE')
    var result = this.hangmanWord
    result.duration = this.duration
    console.log(this.duration + ' ' + this.highScore)
    try {
      console.log(this.duration + ' ' + this.highScore)
      if (this.duration < this.highScore) {
        fs.writeFileSync(this.resultFile, JSON.stringify(result), 'utf8')
      }
    } catch (err) {
      console.error('File exception : ' + err)
    }
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
