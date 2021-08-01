const { Sequelize } = require('sequelize');

const conn = new Sequelize('nativeip', 'root', 'nativeip', {
    dialect: "mysql",
    host: 'mysql'
});

module.exports = conn;