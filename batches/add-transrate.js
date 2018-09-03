const glob = require('glob');
const fs = require('fs');
const csvSync = require('csv-parse/lib/sync'); // requiring sync module

const file = './dataset/transrate-se.csv';
let data = fs.readFileSync(file);
let transrate = csvSync(data);

glob('./dataset/special-english/*.json', (err, files) => {
  const dictionaries = files.map((file) => {
    const dict = require(`../${file}`);
    const ret = transrate.find((v) => v[0] == dict.tokens[0]);
    if (dict.translations.ja.length > 0 ) {
      return dict;
    }
    dict.translations.ja.push({text: ret[1]});
    return dict;
  });
  dictionaries.map((dict) => {
    fs.writeFileSync(`./dataset/special-english/${dict.tokens[0]}.json`, JSON.stringify(dict, null, '  '));
  });
});