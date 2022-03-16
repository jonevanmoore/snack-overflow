'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    user_id: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    answer_id: DataTypes.INTEGER
  }, {});
  Vote.associate = function (models) {
    // associations can be defined here
    Vote.belongsTo(models.User, { foreignKey: 'user_id' })
    Vote.belongsTo(models.Answer, { foreignKey: 'answer_id' })
  };
  return Vote;
};
