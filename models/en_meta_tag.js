'use strict';
module.exports = (sequelize, DataTypes) => {
  const en_meta_tag = sequelize.define('en_meta_tag', {
    en_word_id: DataTypes.INTEGER,
    meta_key: DataTypes.STRING,
    meta_value: DataTypes.JSON,
  }, {
    underscored: true,
  });
  en_meta_tag.associate = function(models) {
    // associations can be defined here
  };
  return en_meta_tag;
};