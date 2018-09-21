'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('en_synonyms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      en_word_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'en_words',
          key: 'id',
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      },
      synonym_word_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'en_words',
          key: 'id',
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('en_synonyms');
  }
};