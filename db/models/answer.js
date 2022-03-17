'use strict';

const question = require("./question");

module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    image_link1: DataTypes.STRING,
    image_link2: DataTypes.STRING,
    image_link3: DataTypes.STRING
  }, {});
  Answer.associate = function (models) {
    // associations can be defined here
    Answer.hasMany(models.Vote, { foreignKey: 'answer_id' })
    Answer.belongsTo(models.User, { foreignKey: 'user_id' })
    Answer.belongsTo(models.Question, { foreignKey: 'question_id' })
  };
  return Answer;
};
