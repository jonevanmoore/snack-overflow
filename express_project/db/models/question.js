'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    user_id: DataTypes.INTEGER,
    image_link1: DataTypes.STRING,
    image_link2: DataTypes.STRING,
    image_link3: DataTypes.STRING,
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
  };
  return Question;
};