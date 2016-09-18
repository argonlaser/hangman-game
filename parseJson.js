/* Read JSON file and return JSON object
 * in a synchronous manner.
 */

module.exports = function(fileName) {
  const fs = require('fs');
  const path = require('path');
  
  var greWordsJson = null;
  var fileContents = null;
  
  try {
    fileContents = fs.readFileSync(fileName).toString();
  }
  catch (err) {
    console.error('File exception : ' + err);
    return greWordsJson;
  }
  try {
    greWordsJson = JSON.parse(fileContents);
  }
  catch(err) {
    console.error('Error parsing json : ' + err);
    return greWordsJson;
  }

  return greWordsJson;
}
