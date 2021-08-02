import {io} from "socket.io-client";

const socket = io("localhost:8081");
socket.on("recieved", (res) => {
    console.log(res);
})

export default socket;