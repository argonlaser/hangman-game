const chai = require('chai')
const expect = chai.expect
const utils = require('../game/utils')

describe('Utils', function () {
  it('#charPos - should get all indices of a letter in a word', function () {
    const hangmanWord = 'abcdeabcdeplsmj'
    const aIndices = [0, 5]
    expect(utils.charPos(hangmanWord, 'a')).to.deep.equals(aIndices)
  })

  it('#initialiseHangmanWordSlot - should init array of given size', function () {
    const hangmanWord = 'aaaa'
    const element = '_'
    const output = ['_', '_', '_', '_']
    expect(utils.initialiseHangmanWordSlot(hangmanWord.length, element)).to.deep.equals(output)
  })
})
