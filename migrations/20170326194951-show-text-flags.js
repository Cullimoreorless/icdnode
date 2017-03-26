'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('Photos','displaycaption',{type:Sequelize.BOOLEAN}),
      queryInterface.addColumn('Projects','showphototext',{type:Sequelize.BOOLEAN})
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Photos','displaycaption'),
      queryInterface.removeColumn('Projects','showphototext')
    ];
  }
};
