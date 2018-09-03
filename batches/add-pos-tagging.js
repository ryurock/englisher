'use strict';

const wordDict = require('../models/words/basic-english/850.json');
const pry = require('pryjs');
const fs = require('fs');
const nlp = require('compromise');

let reMapData = wordDict.map((dict) => {
  let data = {
    id: dict.id,
    tokens: [dict.langueges.en.tokens[0]],
    token: [],
    sort: dict.langueges.en.sort,
    meta: dict.langueges.en.meta,
    phrases: [],
    translations: {
      ja: dict.langueges.ja
    }
  };

  const tokens = dict.langueges.en.tokens[0].split(' ');
  for (let i = 0; i < tokens.length; i++) {
    let token = {
      text: tokens[i],
      postTags: nlp(tokens[i]).terms(0).data()[0].tags,
      bestPosTag: nlp(tokens[i]).terms(0).data()[0].bestTag
    };
    data.token.push(token);
  }
  return data;
});

fs.writeFileSync('./models/words/basic-english.json', JSON.stringify(reMapData, null, '  '));
fs.writeFileSync('./models/words/basic-english.min.json', JSON.stringify(reMapData));