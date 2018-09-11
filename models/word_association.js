'use strict';
module.exports = (sequelize, DataTypes) => {
  const word_association = sequelize.define('word_association', {
    en_word_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  word_association.associate = function(models) {
    // associations can be defined here
  };
  return word_association;
};