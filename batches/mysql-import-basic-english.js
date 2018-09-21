'use strict';

const db = require('../models');
const enWord = db['en_word'];
const jaWord = db['ja_word'];
const enPos  = db['en_part_of_speech'];
const enMetaTag  = db['en_meta_tag'];
const wordAssociation = db['word_association'];
const nlp = require('compromise');


const basicEnglish = require('../datasets/words/basic-english/850.json');
let cnt = 0;

const interval = setInterval(() => {
  if (basicEnglish.length - 1 == cnt) clearInterval(interval);
  const data = basicEnglish[cnt];

  (async () => {
    let enWordRet = await enWord.findOrCreate({
      where: {token: data.langueges.en.tokens[0]},
      defaults: { token: data.langueges.en.tokens[0] }
    }).catch((error) => {
      console.log(error);
    });

    enWordRet = enWordRet[0].get({plain: true});
    let enWordId = enWordRet.id;


    const bestPosTag = nlp(enWordRet.token).terms(0).data()[0].bestTag;
    let posTags = nlp(enWordRet.token).terms(0).data()[0].tags;
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


    data.langueges.ja[0].tokens.map( async (token) => {
      let jaWordRet = await jaWord.findOrCreate({
        where: {token: token},
        defaults: { token: token }
      });
      jaWordRet = jaWordRet[0].get({plain: true});

      await wordAssociation.findOrCreate({
        where: {en_word_id: enWordRet.id, ja_word_id: jaWordRet.id},
        defaults: {en_word_id: enWordRet.id, ja_word_id: jaWordRet.id}
      }).catch((error) => {
        console.error(error);
      });
    });

    enMetaTag.findOrCreate({
      where: {en_word_id: enWordId, meta_key: 'basicEnglish' },
      defaults: {
        en_word_id: enWordId,
        meta_key: 'basicEnglish',
        meta_value: {
          referenced_at: '2018-09',
          type: data.langueges.en.meta.basicEnglish
        }
      },
    });

    cnt++;
  })();
}, 200);