'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class journey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      journey.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "iduser",
        },
      });
      journey.hasMany(models.bookmark, {
        as: "journey",
        foreignKey: {
          name: "idjourney",
        },
      });
    }
  }
  journey.init({
    tittle: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'journey',
  });
  return journey;
};