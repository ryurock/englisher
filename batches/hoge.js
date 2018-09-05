'use strict';

const fs = require('fs');
const glob = require('glob');
const nlp = require('compromise');

glob('./dataset/special-english/*.json', (err, files) => {
  files.forEach((file, index) => {
    const dict = require(`../${file}`);
    let data = {
      id: (index + 1),
      tokens: dict.tokens,
      token: [],
      sort: dict.tokens[0].substr(0, 1),
      meta: dict.meta,
      phrases: [],
      translations: dict.translations
    };

    const tokens = dict.tokens[0].split(' ');
    for (let i = 0; i < tokens.length; i++) {
      let token = {
        text: tokens[i],
        postTags: nlp(tokens[i]).terms(0).data()[0].tags,
        bestPosTag: nlp(tokens[i]).terms(0).data()[0].bestTag
      };
      data.token.push(token);
    }
    fs.writeFileSync(`./dataset/special-english/${dict.tokens[0]}.json`, JSON.stringify(data, null, '  '));
  });
});