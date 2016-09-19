'use strict';

const HangmanGame = require('../game/Hangman');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const gameOptions = require('../game/config')

describe('HangmanGame', function() {
  const game = new HangmanGame(gameOptions[0]);
  it('game should be an object', function() {
    expect(typeof(game)).to.equal('object');
  });
  
  it('should get random hangman word', function() {
    const hangmanWord = game.getRandomHangmanWord(gameOptions[0].datasrcFile);
    should.not.equal(hangmanWord.term, undefined);
    should.not.equal(hangmanWord.definition, undefined);
  });
  
  it('should get all indices of a letter in a word', function() {
    const hangmanWord = 'abcdeabcdeplsmj';
    const aIndices = [0,5];
    expect(game.charPos(hangmanWord, 'a')).to.deep.equals(aIndices);
  });
  
});
