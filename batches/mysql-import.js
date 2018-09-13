'use strict';

const glob = require('glob');
require('dotenv').config();

const db = require('../models');
const enWord = db['en_word'];
const jaWord = db['ja_word'];
const enPos  = db['en_part_of_speech'];
const enMetaTag  = db['en_meta_tag'];
const wordAssociation = db['word_association'];

glob('./datasets/words/special-english/dist/*.json', (err, files) => {
  let fileCount = files.length;
  let cnt = 0;
  const interval = setInterval(() =>{
    if (fileCount - 1 == cnt) clearInterval(interval);
    const dict = require(`../${files[cnt]}`);

    (async () => {
      let enWordRet = await enWord.findOrCreate({
        where: {token: dict.tokens[0]},
        defaults: { token: dict.tokens[0] }
      });
      enWordRet = enWordRet[0].get({plain: true});
      let enWordId = enWordRet.id;


      enMetaTag.findOrCreate({
        where: {en_word_id: enWordId, meta_key: 'specialEnglish' },
        defaults: {en_word_id: enWordId, meta_key: 'specialEnglish', meta_value: {referenced_at: '2018-09'} },
      });


      const bestPosTag = dict.token[0].bestPosTag;
      let posTags = dict.token[0].postTags;
      posTags = posTags.filter((v) => v != bestPosTag);

      await enPos.findOrCreate({
        where: {tag: bestPosTag, en_word_id: enWordId },
        defaults: {tag: bestPosTag, en_word_id: enWordId, priority: 1 },
      });

      let posTagCount = 2;
      posTags.map(async (posTag) => {
        enPos.findOrCreate({
          where: {tag: posTag, en_word_id: enWordId },
          defaults: {tag: posTag, en_word_id: enWordId, priority: posTagCount },
        });
        posTagCount++;
      });

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
        jaTokens.map(async (token) => {
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
  }, 300);
});