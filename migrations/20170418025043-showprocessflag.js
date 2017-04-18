'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('Projects','processdocumenturl',{type:Sequelize.STRING}),
      queryInterface.addColumn('Projects','showprocess',{type:Sequelize.BOOLEAN})
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Projects','processdocumenturl'),
      queryInterface.removeColumn('Projects','showprocess')
    ];
  }
};
