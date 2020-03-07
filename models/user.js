const CONSTANT = require('../constant/data')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    postcode: {
      allowNull: true,
      type: DataTypes.STRING
    },
    occupation: {
      type: DataTypes.ENUM(CONSTANT.occupation)
    },
    avatar: DataTypes.STRING,
    avatar: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    phone: DataTypes.STRING,
    isWorker: {
      default: false,
      type: DataTypes.BOOLEAN
    },
    isConfirmed: {
      default: false,
      type: DataTypes.BOOLEAN
    }
  }, {})
  User.associate = (models) => {
    // associations can be defined here
  };
  return User
};
