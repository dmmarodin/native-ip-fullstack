const sequelize = require("sequelize");
const customerModel = require("../models/customer.model");

const countCustomersByCity = (req, res) => {
    customerModel.findAll({
        attributes: [
            "city",
            [sequelize.fn('COUNT', sequelize.col('id')), 'customers_total']
        ],
        group: "city"
    }).then((cities) => {
        res.send(cities);
    })
}

const customerById = (req, res) => {
    customerModel.findByPk(req.params.id).then((customer) => {
        res.send(customer);
    })
}

module.exports = {
    countCustomersByCity,
    customerById
}