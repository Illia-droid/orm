"use strict";
const { isAfter } = require("date-fns");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: "first_name",
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: "last_name",
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isValidDate(value) {
            if (isAfter(new Date(value), new Date())) {
              throw new Error("check birthday");
            }
          },
        },
      },
      isMale: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: "is_male",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
    }
  );
  return User;
};
