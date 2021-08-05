const { fn, col, Op, literal } = require("sequelize");
const customerModel = require("../models/customer.model");

module.exports = {
  async getNumClientsByCities() {
    const customers = await customerModel.findAll({
      attributes: ["city", [fn("COUNT", col("id")), "customers_total"]],
      order: [[literal("customers_total"), "DESC"], ["city", "ASC"]],
      group: "city",
      raw: true
    });

    return customers ?? [];
  },

  async getCustomerById(id) {
    const customer = await customerModel.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });

    return customer ?? {};
  },

  async getCustomersByCity(city) {
    const customers = await customerModel.findAll({
        attributes: ["id", "first_name", "last_name", "email", "company"],
        where: {
            city: {
                [Op.like]: `%${city}%`
            }
        },
        order: [["first_name", "ASC"]],
        raw: true
    });

    return customers ?? [];
  },

  async updateCustomer(id, data) {
    const result = await customerModel.update(data, {
        where: {
            id: id
        }
    });

    return (result[0] === 1) ? true : false;
  }
};
