const express = require('express');
const router = require('./routes/customer.route');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const socketInjectionMiddleware = require('./middlewares/socketInjection');

class App {
    constructor() {
        this.initServer();
    }

    initServer() {
        this.express = express();
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use("/customer", router);

        this.server = http.createServer(this.express);
        this.io = socketIo(this.server, {
            cors: {
                origin: "*",
                methods: ["GET", "PUT"]
            }
        })

        this.io.on('connection', (socket) => {
            socket.emit('recieved', "socket connected to backend.");
        })

        this.express.use(socketInjectionMiddleware(this.io));
    }
}

module.exports = App;