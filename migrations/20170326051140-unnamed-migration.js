'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('photos','totaltest',Sequelize.STRING);
  },

  down: function (queryInterface, Sequelize) {
    
    return queryInterface.removeColumn('photos','totaltest');
  }
};
