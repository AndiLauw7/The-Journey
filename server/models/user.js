'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.journey, {
        as: "journey",
        foreignKey: {
          name: "iduser",
        },
      });
      user.hasMany(models.bookmark, {
        as: "bookmark",
        foreignKey: {
          name: "iduser",
        },
      });
      user.hasOne(models.profiles, {
        as: "profile",
        foreignKey: {
          name: "iduser",
        },
      });
    }
  }
  user.init({
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};