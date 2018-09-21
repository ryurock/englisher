'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('word_associations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      en_word_id: {
        type: Sequelize.INTEGER,
      },
      ja_word_id: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      queryInterface.addIndex(
        'word_associations',
        {
          fields: ['en_word_id']
        }
      );
      queryInterface.addIndex(
        'word_associations',
        {
          fields: ['ja_word_id']
        }
      );
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('word_associations', 'word_associations_en_word_id')
    .then(() => queryInterface.removeIndex('word_associations', 'word_associations_ja_word_id'))
    .then(() => queryInterface.dropTable('word_associations'));
  }
};