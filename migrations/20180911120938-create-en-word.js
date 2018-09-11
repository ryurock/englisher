'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.createTable('en_words', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false,
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
        'en_words',
        {
          fields: ['token'],
          unique: true,
        }
      )
    ];
  },
  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeIndex('en_words', 'en_words_token'),
      queryInterface.dropTable('en_words'),
    ];
  }
};