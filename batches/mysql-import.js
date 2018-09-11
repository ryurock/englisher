'use strict';

const fs = require('fs');
const glob = require('glob');
require('dotenv').config();

const db = require('../models');
const enWord = db['en_word'];

glob('./datasets/words/special-english/dist/*.json', (err, files) => {
  files.forEach((file) => {
    const dict = require(`../${file}`);
    (async () => {
      let ret = await enWord.findOrCreate({
        where: {token: dict.tokens[0]},
        defaults: { token: dict.tokens[0] }
      });
      ret = ret[0].get({plain: true});

      console.log(ret);
      process.exit();
    })();
    // enWord.findOrCreate({
    //   where: {token: dict.tokens[0]},
    //   defaults: { token: dict.tokens[0] }
    // }).then((result, created) => {
    //   console.log(result);
    //   process.exit();
    // });
  });
});