const { fn, col, Op, literal } = require("sequelize");
const customerModel = require("../models/customer.model");

module.exports = {
  async getNumClientsByCities() {
    const customers = await customerModel.findAll({
      attributes: ["city", [fn("COUNT", col("id")), "customers_total"]],
      order: [[literal("customers_total"), "DESC"], ["city", "ASC"]],
      group: "city",
    });

    return customers;
  },

  async getCustomerById(id) {
    return await customerModel.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });
  },

  async getCustomersByCity(city) {
    const customers = await customerModel.findAll({
        attributes: ["id", "first_name", "last_name", "email", "company"],
        where: {
            city: {
                [Op.like]: `%${city}%`
            }
        },
        order: [["first_name", "ASC"]]
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
