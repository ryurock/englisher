'use strict';

module.exports = (sequelize, DataTypes) => {
  const en_word = sequelize.define('en_word', {
    token: DataTypes.STRING
  }, {
    underscored: true,
  });

  en_word.associate = function(models) {
    en_word.hasMany(models.en_meta_tag);
  };

  en_word.findMetaTag = function(enWordId){
    return sequelize.query(`
    SELECT
      ew.id,ew.token,ew.created_at,ew.updated_at,
      emt.meta_key,emt.meta_value
    FROM en_words ew
    INNER JOIN en_meta_tags emt on emt.en_word_id = ew.id
    WHERE ew.id = ?
    `,
    { replacements: [enWordId], type: sequelize.QueryTypes.SELECT });
  };

  return en_word;
};