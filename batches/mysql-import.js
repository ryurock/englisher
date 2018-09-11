'use strict';

const glob = require('glob');
require('dotenv').config();

const db = require('../models');
const enWord = db['en_word'];
const jaWord = db['ja_word'];
const wordAssociation = db['word_association'];

glob('./datasets/words/special-english/dist/*.json', (err, files) => {
  let fileCount = files.length;
  let cnt = 0;
  const interval = setInterval(() =>{
    if (fileCount - 1 == cnt) clearInterval(interval);
    console.log(cnt);
    const dict = require(`../${files[cnt]}`);
    (async () => {
      let enWordRet = await enWord.findOrCreate({
        where: {token: dict.tokens[0]},
        defaults: { token: dict.tokens[0] }
      });
      enWordRet = enWordRet[0].get({plain: true});

      const jaTokens = dict.translations.ja[0].text;
      if (typeof jaTokens === 'string') {
        let jaWordRet = await jaWord.findOrCreate({
          where: {token: jaTokens},
          defaults: { token: jaTokens }
        });
        jaWordRet = jaWordRet[0].get({plain: true});

        await wordAssociation.findOrCreate({
          where: {en_word_id: enWordRet.id, ja_word_id: jaWordRet.id},
          defaults: {en_word_id: enWordRet.id, ja_word_id: jaWordRet.id}
        });

      } else {
        await jaTokens.map(async (token) => {
          let jaWordRet = await jaWord.findOrCreate({
            where: {token: token},
            defaults: { token: token }
          });
          jaWordRet = jaWordRet[0].get({plain: true});
          await wordAssociation.findOrCreate({
            where: {en_word_id: enWordRet.id, ja_word_id: jaWordRet.id},
            defaults: {en_word_id: enWordRet.id, ja_word_id: jaWordRet.id}
          });
        });
      }

    })();

    cnt++;
  }, 1000);
});