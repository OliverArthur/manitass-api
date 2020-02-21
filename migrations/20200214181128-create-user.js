const CONSTANT = require('../constant/data')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      postcode: {
        type: Sequelize.STRING
      },
      occupation: {
        type: Sequelize.ENUM,
        values: CONSTANT.occupation
      },
      avatar: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      isWorker: {
        default: false,
        type: Sequelize.BOOLEAN
      },
      isConfirmed: {
        default: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users')
  }
}
