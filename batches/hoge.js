'use strict';

const fs = require('fs');
const glob = require('glob');
const nlp = require('compromise');

glob('./dataset/special-english/*.json', (err, files) => {
  files.forEach((file, index) => {
    const dict = require(`../${file}`);
    fs.writeFileSync(`./models/words/special-english/raw/${dict.tokens[0]}.json`, JSON.stringify(dict, null, '  '));
  });
});