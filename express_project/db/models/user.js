'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    hashed_password: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.TEXT,
    image_link: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Question, { foreignKey: 'user_id' })
    User.hasMany(models.Answer, { foreignKey: 'user_id' })
    User.hasMany(models.Vote, { foreignKey: 'user_id' })
  };
  return User;
};
