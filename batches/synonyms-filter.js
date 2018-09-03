const wordDict = require('../dataset/special-english.json');
const glob = require('glob');
const path = require('path');

glob('./dataset/special-english/*.json', (err, files) => {
  files.map((file) => {
    const dict = require(`../${file}`);
    console.log(dict.synonyms);
    const synonyms = dict.synonyms.filter((synonym) => {
      return wordDict.indexOf(synonym) != -1;
    });
    console.log(synonyms);
  });
  // process.exit();
});