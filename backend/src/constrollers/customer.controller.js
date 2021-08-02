const service = require("../services/customer");

const countCustomersByCity = async (_, res) => {
    const cities = await service.getNumClientsByCities();
    res.send(cities);
}

const customerById = async(req, res) => {
    const customer = await service.getCustomerById(req.params.id);
    res.send(customer);
}

const customersByCity = async (req, res) => {
    const customers = await service.getCustomersByCity(req.params.city);
    res.send(customers);
}

const updateCustomerById = async (req, res) => {
    const data = req.body;

    const result = await service.updateCustomer(req.params.id, data);

    if(result && result > 0) {
        req.socket.emit("customerUpdate", "");
    }

    res.send({});
}

module.exports = {
    countCustomersByCity,
    customerById,
    customersByCity,
    updateCustomerById
}