'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('en_meta_tags', {
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
          key: 'id',
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      },
      meta_key: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => {
      return queryInterface.addIndex(
        'en_meta_tags',
        {
          fields: ['meta_key']
        }
      );
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('en_meta_tags', 'en_meta_tags_meta_key')
    .then(() => queryInterface.dropTable('en_meta_tags'));
  }
};