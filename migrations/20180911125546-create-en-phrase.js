'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.createTable('en_phrases', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        en_word_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'en_words',
            key: 'id'
          }
        },
        phrase: {
          type: Sequelize.STRING
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
      queryInterface.addIndex(
        'en_phrases',
        {
          fields: ['phrase'],
          unique: true,
        }
      )
    ];
  },
  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeIndex('en_phrases', 'en_phrases_phrase'),
      queryInterface.dropTable('en_phrases')
    ];
  }
};