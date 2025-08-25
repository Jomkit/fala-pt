'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vocabulary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vocabulary.init({
    name: DataTypes.STRING,
    lang1: DataTypes.STRING,
    lang2: DataTypes.STRING,
    wordClass: DataTypes.ENUM('noun', 'verb', 'adjective', 'expression', 'other'),
    category: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Vocabulary',
  });
  return Vocabulary;
};