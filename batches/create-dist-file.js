'use strict';

const db = require('../models');
const enWord = db['en_word'];
const enPos  = db['en_part_of_speech'];
const enMetaTag  = db['en_meta_tag'];
const wordAssociation = db['word_association'];
const enSynonym = db['en_synonym'];

const fs = require('fs');

(async () => {
  enWord.hasMany(enMetaTag);
  enMetaTag.belongsTo(enWord);
  enWord.findAll()
  .then(async (enWords) => {
    for (let i = 0; i < enWords.length; i++) {
      const enWordId = enWords[i].id;
      const data = {
        token: enWords[i].token,
        pos: {
          tags: [],
          bestPosTag: null,
        },
        metaTags: [],
        synonyms: [],
        phrases: [],
        translate: { ja: [] }
      };

      Promise.all([
        await enSynonym.findBySynonymWords(enWordId),
        await enPos.findAll({ where: { en_word_id: enWordId } }),
        await wordAssociation.findByJaTokens(enWordId),
        await enMetaTag.findAll({ where: { en_word_id: enWordId } })
      ])
      .then((responses) => {
        const synonyms = responses[0];
        const poses    = responses[1];
        const jaTokens = responses[2];
        const metaTags = responses[3];

        if (synonyms.length > 0) {
          data.synonyms = synonyms.map((synonym) => {
            return {
              id: synonym.id,
              synonym_word_id: synonym.synonym_word_id,
              token: synonym.token
            };
          });
        }

        if (poses.length > 0) {
          data.pos.tags = poses.map((pos) => {
            return {
              id: pos.id,
              en_word_id: pos.en_word_id,
              tag: pos.tag,
              priority: pos.priority
            };
          });
          const bestPosTag = data.pos.tags.find((v) => v.priority == 1 );
          data.pos.bestPosTag = bestPosTag;
        }

        data.translate.ja = jaTokens.map((jaToken) => {
          return  {
            id: jaToken.ja_word_id,
            token: jaToken.japanese_token
          };
        });

        data.metaTags = metaTags.map((metaTag) => {
          return {
            id: metaTag.id,
            metaKey: metaTag.meta_key,
            metaValue: metaTag.meta_value
          };
        });

        data.metaTags.map((metaTag) => {
          if (metaTag.metaKey == 'specialEnglish') {
            fs.writeFileSync(`./datasets/words/special-english/dist/${data.token}.min.json`, JSON.stringify(data));
          }

          if (metaTag.metaKey == 'basicEnglish') {
            fs.writeFileSync(`./datasets/words/basic-english/dist/${data.token}.min.json`, JSON.stringify(data));
          }
        });
      });
    }
  });
})();