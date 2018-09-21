'use strict';
module.exports = (sequelize, DataTypes) => {
  const en_synonym = sequelize.define('en_synonym', {
    en_word_id: DataTypes.INTEGER,
    synonym_word_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  en_synonym.associate = function(models) {
    // associations can be defined here
  };

  en_synonym.findBySynonymWords = function(enWordId) {
    return sequelize.query(`
    SELECT
      es.en_word_id, es.synonym_word_id, ew.token
    FROM en_synonyms es
    INNER JOIN en_words ew ON ew.id = es.synonym_word_id
    WHERE es.en_word_id = ?
    `,
    { replacements: [ enWordId ], type: sequelize.QueryTypes.SELECT });
  };
  return en_synonym;
};