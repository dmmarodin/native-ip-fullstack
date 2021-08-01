const express = require('express');
const router = require('./routes/routes');

class App {
    constructor() {
        this.initServer();
    }

    initServer() {
        this.express = express();
        this.express.use(express.json());
        this.express.use(router);
    }
}

module.exports = App;