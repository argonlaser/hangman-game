const hangmanHFwordsFile = './data/hf_words.json';
const hangmanGREwordsFile = './data/gre_words.json';
const resultFile = './results/results.json';

const gameOptions = 
      [
        {
          name:'hf_words',
          input:process.stdin,
          output: process.stdout,
          datasrcFile:hangmanHFwordsFile,
          resultFile:resultFile
        },
        {
          name:'gre_words',
          input:process.stdin,
          output: process.stdout,
          datasrcFile:hangmanGREwordsFile,
          resultFile:resultFile
        }
      ];

module.exports = gameOptions;