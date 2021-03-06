'use strict';

const db = require('../models');
const enWord = db['en_word'];
const enPos  = db['en_part_of_speech'];
const enMetaTag  = db['en_meta_tag'];
const wordAssociation = db['word_association'];
const enSynonym = db['en_synonym'];
const glob = require('glob');

const fs = require('fs');

(async () => {
  enWord.findAll()
  .then((enWords) => {
    return new Promise(async (resolve) => {
      for (let i = 0; i < enWords.length; i++) {
        const enWordId = enWords[i].id;
        const data = {
          id: enWords[i].id,
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

          if (synonyms.length > 0) {
            data.synonyms = synonyms.map((synonym) => {
              return {
                id: synonym.id,
                synonym_word_id: synonym.synonym_word_id,
                token: synonym.token
              };
            });
          }

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
      resolve();
    }).then(() => {
      return new Promise((resolve) => {
        glob('./datasets/words/basic-english/dist/*.min.json', async (err, files) => {
          for (let i = 0; i < files.length; i++) {
            const wordFile = require(`../${files[i]}`);
            if (wordFile.synonyms.length == 0) continue;
            for (let ii = 0; ii < wordFile.synonyms.length; ii++) {
              const synonymWordId = wordFile.synonyms[ii].synonym_word_id;
              const metaTags = await enWord.findMetaTags(synonymWordId);
              const links = {};
              const isBasicEnglish = metaTags.find((metaTag) => metaTag.meta_key == 'basicEnglish');
              if (isBasicEnglish) links.basicEnglish = `/word/basic-english/${wordFile.synonyms[ii].token}`;
              const isSpecialEnglish = metaTags.find((metaTag) => metaTag.meta_key == 'specialEnglish');
              if (isSpecialEnglish) links.specialEnglish = `/word/special-english/${wordFile.synonyms[ii].token}`;
              wordFile.synonyms[ii].links = links;
              fs.writeFileSync(`./datasets/words/basic-english/dist/${wordFile.token}.min.json`, JSON.stringify(wordFile));
            }
          }
          console.log('write basic-english synonyms finish');
          resolve();
        });
      });
    }).then(() => {
      return new Promise((resolve) => {
        glob('./datasets/words/special-english/dist/*.min.json', async (err, files) => {
          for (let i = 0; i < files.length; i++) {
            const wordFile = require(`../${files[i]}`);
            if (wordFile.synonyms.length == 0) continue;
            for (let ii = 0; ii < wordFile.synonyms.length; ii++) {
              const synonymWordId = wordFile.synonyms[ii].synonym_word_id;
              const metaTags = await enWord.findMetaTags(synonymWordId);
              const links = {};
              const isBasicEnglish = metaTags.find((metaTag) => metaTag.meta_key == 'basicEnglish');
              if (isBasicEnglish) links.basicEnglish = `/word/basic-english/${wordFile.synonyms[ii].token}`;
              const isSpecialEnglish = metaTags.find((metaTag) => metaTag.meta_key == 'specialEnglish');
              if (isSpecialEnglish) links.specialEnglish = `/word/special-english/${wordFile.synonyms[ii].token}`;
              wordFile.synonyms[ii].links = links;
              fs.writeFileSync(`./datasets/words/special-english/dist/${wordFile.token}.min.json`, JSON.stringify(wordFile));
            }
          }
          console.log('write special-english synonyms finish');
          resolve();
        });
      });
    }).then(() => {
      console.log('finish');
      glob('./datasets/words/basic-english/dist/*.min.json', (err, files) => {
        const speedcard = files.map((filePath) => {
          const data = require(`../${filePath}`);
          return {
            id: data.id,
            token: data.token,
            translate: data.translate
          };
        });
        fs.writeFileSync('./datasets/words/basic-english/speedcard.min.json', JSON.stringify(speedcard));
        fs.writeFileSync('./datasets/words/basic-english/speedcard.json', JSON.stringify(speedcard, null, '  '));

        const allData = files.map((filePath) => require(`../${filePath}`));
        fs.writeFileSync('./datasets/words/basic-english/all.min.json', JSON.stringify(allData));
        fs.writeFileSync('./datasets/words/basic-english/all.json', JSON.stringify(allData, null, '  '));
      });
      glob('./datasets/words/special-english/dist/*.min.json', (err, files) => {
        const speedcard = files.map((filePath) => {
          const data = require(`../${filePath}`);
          return {
            id: data.id,
            token: data.token,
            translate: data.translate
          };
        });
        fs.writeFileSync('./datasets/words/special-english/speedcard.min.json', JSON.stringify(speedcard));
        fs.writeFileSync('./datasets/words/special-english/speedcard.json', JSON.stringify(speedcard, null, '  '));

        const allData = files.map((filePath) => require(`../${filePath}`));
        fs.writeFileSync('./datasets/words/special-english/all.min.json', JSON.stringify(allData));
        fs.writeFileSync('./datasets/words/special-english/all.json', JSON.stringify(allData, null, '  '));

      });
    });
  });
})();