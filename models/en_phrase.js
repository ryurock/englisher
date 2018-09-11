'use strict';
module.exports = (sequelize, DataTypes) => {
  const en_phrase = sequelize.define('en_phrase', {
    phrase: DataTypes.STRING
  }, {
    underscored: true,
  });
  en_phrase.associate = function(models) {
    // associations can be defined here
  };
  return en_phrase;
};