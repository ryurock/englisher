'use strict';

const wordDict = require('../models/words/basic-english.min.json');
const pry = require('pryjs');
const fs = require('fs');

let reMapData = wordDict.map((dict) => {
  const example = dict.translations.ja.map((v) => {
    return (v.example[0]) ? v.example[0].trim() : '';
  });
  dict.phrases = dict.phrases.concat(example);

  dict.translations.newJa = dict.translations.ja.map((v, i) => {
    const text = v.tokens;
    return { text: text};
  });
  return dict;
});


let reMapData = wordDict.map((v) => {
  v.translations.ja = v.translations.ja.map((vv) => {
    if (vv) {
      vv.text = vv.text.filter(vvv => vvv.replace(/ |　/, ''));
    }
    return vv;
  });
  return v;
});
// process.exit();
// fs.writeFileSync('./models/words/basic-english.json', JSON.stringify(reMapData, null, '  '));
// fs.writeFileSync('./models/words/basic-english.min.json', JSON.stringify(reMapData));
reMapData.map((v) => {
  if (v.tokens == 'even') {
    console.log(v.translations.ja);
    process.exit();
  }
});
