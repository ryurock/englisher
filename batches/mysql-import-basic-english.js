'use strict';

const db = require('../models');
const enWord = db['en_word'];
const jaWord = db['ja_word'];
const enPos  = db['en_part_of_speech'];
const enMetaTag  = db['en_meta_tag'];
const wordAssociation = db['word_association'];

const basicEnglish = require('./datasets/words/basic-english/850.json');
basicEnglish.map((data) => {
  console.log(data);
});