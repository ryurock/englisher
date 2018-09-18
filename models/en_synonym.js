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
  return en_synonym;
};