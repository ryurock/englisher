'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('en_part_of_speeches', {
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
      tag: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      priority: {
        type: Sequelize.INTEGER,
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
    }).then(() => {
      return queryInterface.addIndex(
        'en_part_of_speeches',
        {
          fields: ['tag']
        }
      );
    })
    .then(() => {
      return queryInterface.addIndex(
        'en_part_of_speeches',
        {
          fields: ['priority']
        }
      );
    })
    .then(() => {
      return queryInterface.addIndex(
        'en_part_of_speeches',
        {
          fields: ['tag', 'priority']
        }
      );
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('en_part_of_speeches', 'en_part_of_speeches_tag')
    .then(() => queryInterface.removeIndex('en_part_of_speeches', 'en_part_of_speeches_priority'))
    .then(() => queryInterface.removeIndex('en_part_of_speeches', 'en_part_of_speeches_tag_priority'))
    .then(() => queryInterface.dropTable('en_part_of_speeches'));
  }
};