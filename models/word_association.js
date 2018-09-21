'use strict';
module.exports = (sequelize, DataTypes) => {
  const word_association = sequelize.define('word_association', {
    en_word_id: DataTypes.INTEGER,
    ja_word_id: DataTypes.INTEGER,
  }, {
    underscored: true,
  });
  word_association.associate = function(models) {
    word_association.belongsToMany(models.en_word, {through: 'enWordAssociation'});
    word_association.belongsToMany(models.ja_word, {through: 'jaWordAssociation'});
  };

  word_association.findByJaTokens = function(enWordId) {
    return sequelize.query(`
    SELECT
      wa.en_word_id, wa.ja_word_id,
      ew.token AS english_token,
      jw.token AS japanese_token
    FROM word_associations wa
    INNER JOIN en_words ew ON ew.id = wa.en_word_id
    INNER JOIN ja_words jw ON jw.id = wa.ja_word_id
    WHERE
      wa.en_word_id = ?
    `,
    { replacements: [ enWordId ], type: sequelize.QueryTypes.SELECT });
  };
  return word_association;
};