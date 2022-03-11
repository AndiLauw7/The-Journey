'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      profiles.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "iduser",
        },
      });
    }
  }
  profiles.init({
    fullname: DataTypes.STRING,
    iduser: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address:DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'profiles',
  });
  return profiles;
};