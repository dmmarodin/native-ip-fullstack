const express = require('express');
const router = require('./routes/routes');
const cors = require('cors');

class App {
    constructor() {
        this.initServer();
    }

    initServer() {
        this.express = express();
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(router);
    }
}

module.exports = App;