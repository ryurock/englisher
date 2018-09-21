// const wordDict = require('../dataset/special-english.json');
const pry = require('pryjs');
const fs = require('fs');
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;



const db = require('../models');
const enWord = db['en_word'];
const enSynonym = db['en_synonym'];


let cnt = 0;
(async () =>{
  const enWoedAll = await enWord.findAll();
  const interval = setInterval(async () => {
    const config = {
      headers: {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36 '}
    };

    const tokens = enWoedAll.map((v) => v.token);
    const url = `http://www.synonym.com/synonyms/${enWoedAll[cnt].token}`;
    const response = await axios.get(url, config);
    let dom = new JSDOM(response.data);
    const html = dom.window.document.querySelectorAll('div.card')[0].innerHTML;
    dom = new JSDOM(html);
    let data = Array.from(dom.window.document.querySelectorAll('li.syn > a'), (node) => node.innerHTML);
    data = data.filter((v) => tokens.indexOf(v) != -1);
    if (data.length > 0) {
      data.map((v) => {
        const synonymWord = enWoedAll.find((vv) => vv.token == v);
        enSynonym.findOrCreate({
          where: {en_word_id: enWoedAll[cnt].id, synonym_word_id: synonymWord.id},
          defaults: {en_word_id: enWoedAll[cnt].id, synonym_word_id: synonymWord.id},
        });
      });
    }

    cnt++;
  }, 200);

})();


// let count = wordDict.indexOf('also');
// const interval = setInterval(() => {
//   if (count == wordDict.length) clearInterval(interval);
//   const config = {
//     headers: {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36 '}
//   };

//   const url = `http://www.synonym.com/synonyms/${wordDict[count]}`;
//   axios.get(url, config)
//   .then((response) => {
//     let dom = new JSDOM(response.data);
//     // // console.log(response);
//     const html = dom.window.document.querySelectorAll('div.card')[0].innerHTML;
//     dom = new JSDOM(html);
//     console.log(wordDict[count]);
//     let data = Array.from(dom.window.document.querySelectorAll('li.syn > a'), (node) => node.innerHTML);
//     data = data.filter((v) => wordDict.indexOf(v) != -1);
//     let struct = {
//       tokens: [wordDict[count]],
//       token: [],
//       sort: null,
//       meta: { specialEnglish: '' },
//       phrases: [],
//       synonyms: data,
//       translations: { ja: [] }
//     };
//     fs.writeFileSync(`./dataset/special-english/${wordDict[count]}.json`, JSON.stringify(struct, null, '  '));
//     count++;
//   })
//   .catch((err) => {
//     console.log(`no data ${wordDict[count]}`);
//     count++;
//   });
// }, 1000);