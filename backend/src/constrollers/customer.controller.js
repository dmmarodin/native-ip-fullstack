const service = require("../services/customer");
const _ = require("lodash");
const validator = require("validator");

const countCustomersByCity = async (_, res) => {
    try {
        const cities = await service.getNumClientsByCities();
        if(cities) {
            res.send(cities);
        } else {
            res.status(404).send({ message: "Cidades não encontradas." });
        }
    } catch(e) {
        res.status(500).send({
            message: "Ocorreu um erro ao buscar as cidades"
        });
    }
}

const customerById = async(req, res) => {
    const id = req.params.id;
    if(!validator.isInt(id)) {
        res.status(400).send({ message: "id deve ser numérico." });
        return;
    }

    try{
        const customer = await service.getCustomerById(id);

        if(!_.isEmpty(customer)) {
            res.send(customer);
        } else {
            res.status(404).send({ message: "Cliente não encontrado." });
        }
    } catch (e) {
        res.status(500).send({
            message: "Ocorreu um erro ao procurar o cliente."
        });
    }
}

const customersByCity = async (req, res) => {
    try {
        const customers = await service.getCustomersByCity(req.params.city);

        if(_.isEmpty(customers)) {
            res.status(404).send({ message: "Cidade não encontrada." });
        } else {
            res.send(customers);
        }
    } catch (e) {
        res.status(500).send({
            message: "Ocorreu um erro ao listar clientes."
        });
    }
}

const updateCustomerById = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    if(!validator.isInt(id)) {
        res.status(400).send({ message: "id deve ser numérico." });
        return;
    }

    if(!data.first_name || !data.last_name || !data.email || !data.city) {
        console.log("aaaaa===")
        console.log(data)
        res.status(400).send({ message: "primeiro nome, segundo nome, email e cidade são obrigatórios." });
        return;
    }

    if(!validator.isEmail(data.email)) {
        res.status(400).send({ message: "email inválido." });
        return;
    }

    try {
        const result = await service.updateCustomer(id, data);

        if(result && result > 0) {
            req.socket.emit("customerUpdate", "");
        }

        if(result == true) {
            res.status(200).send({ message: "cliente atualizado com sucesso. "});
        } else {
            res.status(404).send({ message: "cliente não encontrado. "});
        }
    } catch (e) {
        res.status(500).send({
            message: "Ocorreu um erro ao listar clientes."
        });
    }
}

module.exports = {
    countCustomersByCity,
    customerById,
    customersByCity,
    updateCustomerById
}