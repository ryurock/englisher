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
  return word_association;
};