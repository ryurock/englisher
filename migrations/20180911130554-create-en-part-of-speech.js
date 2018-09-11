'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.createTable('en_part_of_speeches', {
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
      }),
      queryInterface.addIndex(
        'en_part_of_speeches',
        {
          fields: ['tag']
        }
      ),
      queryInterface.addIndex(
        'en_part_of_speeches',
        {
          fields: ['priority']
        }
      ),
      queryInterface.addIndex(
        'en_part_of_speeches',
        {
          fields: ['tag', 'priority']
        }
      )
    ];
  },
  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeIndex('en_part_of_speeches', 'en_part_of_speeches_tag'),
      queryInterface.removeIndex('en_part_of_speeches', 'en_part_of_speeches_priority'),
      queryInterface.removeIndex('en_part_of_speeches', 'en_part_of_speeches_tag_priority'),
      queryInterface.dropTable('en_part_of_speeches')
    ];
  }
};