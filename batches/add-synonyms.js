const pry = require('pryjs');
const fs = require('fs');

const db = require('../models');
const enWord = db['en_word'];
const enSynonym = db['en_synonym'];
const wordNet = require('wordnetjs');

(async () =>{
  const enWordAll = await enWord.findAll();
  const words = enWordAll.map((v) => v.token);
  let datas = enWordAll.map((word) => {
    const synonyms = wordNet.synonyms(word.token);
    if (synonyms.length == 0) return {};
    let data = {
      id: word.id,
      token: word.token,
      synonyms: synonyms.map((v) => v.far )
    };
    data.synonyms = data.synonyms.reduce((acc, val) => acc.concat(val), []);
    return data;
  }).filter((v) => v.hasOwnProperty('token'));
  datas = datas.map((data) => {
    let synonyms = data.synonyms.filter((synonym) => {
      return words.indexOf(synonym) !== -1;
    });
    data.synonyms = synonyms;
    return data;
  });
  datas.map((data) => {
    enWord.findAll({where: {token: data.synonyms}})
    .then((result) => {
      result.map((v) => {
        enSynonym.findOrCreate({
          where: {
            en_word_id: data.id,
            synonym_word_id: v.id
          },
          defaults: {
            en_word_id: data.id,
            synonym_word_id: v.id
          }
        });
      });
    });
  });
})();