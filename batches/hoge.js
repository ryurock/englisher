'use strict';

const fs = require('fs');
const glob = require('glob');
const nlp = require('compromise');
let tags = [];
glob('./models/words/special-english/dist/*.json', (err, files) => {
  files.forEach((file, index) => {
    const dict = require(`../${file}`);
    const postTags = dict.token.map((v) => {
      v.postTags.map((vv) => {
        tags.push(vv);
      });
    });
  });
  console.log(tags);
  tags = tags.filter(function (x, i, self) {
    return self.indexOf(x) === i;
  });
  console.log(tags);
});