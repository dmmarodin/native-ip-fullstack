'use strict';

const fs = require("fs");
const path = require("path");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pathToCustomers = path.join(__dirname, "./customers.json");
    const customers = JSON.parse(fs.readFileSync(pathToCustomers));



    await queryInterface.bulkInsert('customers', customers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customers', null, {});
  }
};
