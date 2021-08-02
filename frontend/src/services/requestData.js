import axios from "./axiosInstance";

export async function getCities() {
    const result = await axios.get("/customer/cities");
    return result.data;
}

export async function getClientsByCity(cityName) {
    const result = await axios.get("/customer/cities/" + encodeURI(cityName));
    return result.data;
}

export async function getClientById(id) {
    const result = await axios.get("/customer/" + id);
    return result.data;
}

export async function updateCustomer(id, customer) {
    return axios.put("/customer/" + id, customer);
}