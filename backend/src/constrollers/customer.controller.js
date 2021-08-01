const { fn, col, Op } = require("sequelize");
const customerModel = require("../models/customer.model");

const countCustomersByCity = async (_, res) => {
    const cities = await customerModel.findAll({
        attributes: [
            "city",
            [fn('COUNT', col('id')), 'customers_total']
        ],
        group: "city"
    });

    res.send(cities);
}

const customerById = async(req, res) => {
    const customer = await customerModel.findByPk(req.params.id);
    res.send(customer);
}

const customersByCity = async (req, res) => {
    const customers = await customerModel.findAll({
        where: {
            city: {
                [Op.like]: `%${req.params.city}%`
            }
        }
    });

    res.send(customers);
}

const updateCustomerById = async (req, res) => {
    const data = req.body;

    const result = await customerModel.update(data, {
        where: {
            id: req.params.id
        }
    });

    res.send(result);
}

module.exports = {
    countCustomersByCity,
    customerById,
    customersByCity,
    updateCustomerById
}