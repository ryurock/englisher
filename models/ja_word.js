'use strict';
module.exports = (sequelize, DataTypes) => {
  const ja_word = sequelize.define('ja_word', {
    token: DataTypes.STRING
  }, {
    underscored: true,
  });
  ja_word.associate = function(models) {
    // associations can be defined here
  };
  return ja_word;
};