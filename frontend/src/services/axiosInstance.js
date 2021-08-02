import axios from 'axios';

const conn = axios.create({
    baseURL: "http://localhost:8081"
})

export default conn;