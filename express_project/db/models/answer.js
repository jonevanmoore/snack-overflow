'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    image_link1: DataTypes.STRING,
    image_link2: DataTypes.STRING,
    image_link3: DataTypes.STRING
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
  };
  return Answer;
};