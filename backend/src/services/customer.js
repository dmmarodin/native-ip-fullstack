const { fn, col, Op } = require("sequelize");
const customerModel = require("../models/customer.model");

module.exports = {
  async getNumClientsByCities() {
    const customers = await customerModel.findAll({
      attributes: ["city", [fn("COUNT", col("id")), "customers_total"]],
      group: "city",
    });

    return customers;
  },

  async getCustomerById(id) {
    return await customerModel.findByPk(id);
  },

  async getCustomersByCity(city) {
    const customers = await customerModel.findAll({
        where: {
            city: {
                [Op.like]: `%${city}%`
            }
        }
    });

    return customers;
  },

  async updateCustomer(id, data) {
    const result = await customerModel.update(data, {
        where: {
            id: id
        }
    });

    return result;
  }
};
