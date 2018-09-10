'use strict';

const fs = require('fs');
const glob = require('glob');
require('dotenv').config();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database: 'enner'
});
connection.connect();

glob('./models/words/special-english/dist/*.json', (err, files) => {
  files.map((file) => {
    const dict = require(`../${file}`);
    connection.beginTransaction((err) => {

      // const enWords = new Promise((resolve, reject) => {
      //   connection.query(`INSERT INTO en_words (token) VALUES (?)`, [dict.tokens[0]], (err, results, fields) => {
      //     if (err) {
      //       console.log(err);
      //       throw err;
      //     }
      //     resolve(results);
      //   });
      // });


      // const partOfSpeech = new Promise((resovle, reject) => {
      //   const length = dict.token[0].postTags.length;
      //   let counrer = 0;
      //   dict.token[0].postTags.map((v,i) => {
      //     connection.query(`INSERT INTO en_part_of_speeches (en_word_id, tag) VALUES (?, ?)`, [dict.id, v], (err, results, fields) => {
      //       if (err) {
      //         console.log(err);
      //         throw err;
      //       }
      //       counrer++;
      //       console.log(length);
      //       console.log(counrer);
      //       if (counrer == length) resolve();
      //     });
      //   });
      // });

      const promise = Promise.resolve();
      promise.then(() => {
        return new Promise((resolve, reject) => {
          connection.query(`INSERT INTO en_words (token) VALUES (?)`, [dict.tokens[0]], (err, results, fields) => {
            if (err) {
              console.log(err);
              throw err;
            }
            resolve(results);
          });
        });
      })
      .then((result) => {
        console.log(result.insertId);
        connection.rollback();
        process.exit();
      })
      .catch((err) => {
        console.log(err);
      });

    });
  });
});