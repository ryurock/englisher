'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.createTable('ja_words', {
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
        'ja_words',
        {
          fields: ['token'],
          unique: true,
        }
      )
    ];
  },
  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeIndex('ja_words', 'ja_words_token'),
      queryInterface.dropTable('ja_words')
    ];
  }
};