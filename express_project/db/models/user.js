'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    hashed_password: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.TEXT,
    image_link: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};