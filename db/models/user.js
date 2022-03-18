'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(20),
      validate: {
        len: {
          args: [1,20],
          msg: "Username must be 20 characters or fewer."
        }
      }
    },
    hashed_password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING(20),
      validate: {
        len: {
          args: [3,20],
          msg: "Email must be 20 characters or fewer."
  
        }
      }
    },
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
