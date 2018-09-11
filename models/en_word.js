'use strict';
module.exports = (sequelize, DataTypes) => {
  const en_word = sequelize.define('en_word', {
    token: DataTypes.STRING
  }, {
    underscored: true,
  });
  en_word.associate = function(models) {
    // associations can be defined here
  };
  return en_word;
};