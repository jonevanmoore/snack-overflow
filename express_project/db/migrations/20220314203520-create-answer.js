'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      question_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Questions' }
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      image_link1: {
        type: Sequelize.STRING
      },
      image_link2: {
        type: Sequelize.STRING
      },
      image_link3: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Answers');
  }
};
