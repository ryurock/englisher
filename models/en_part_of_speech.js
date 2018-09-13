'use strict';
module.exports = (sequelize, DataTypes) => {
  const en_part_of_speech = sequelize.define('en_part_of_speech', {
    tag:        DataTypes.STRING,
    en_word_id: DataTypes.INTEGER,
    priority:   DataTypes.INTEGER,
  }, {
    underscored: true,
  });
  en_part_of_speech.associate = function(models) {
    // associations can be defined here
  };
  return en_part_of_speech;
};