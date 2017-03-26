'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn("projects","hasphototext", Sequelize.BOOLEAN),
      queryInterface.addColumn("photos","displaycaptionflag",Sequelize.BOOLEAN)
    ]
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn("projects","hasphototext"),
      queryInterface.removeColumn("photos","displaycaptionflag")
    ]
  }
};
