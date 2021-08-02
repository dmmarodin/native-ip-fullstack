import { useState, useEffect } from "react";
import { getCities } from "../../services/requestData";
import socket from "../../services/socketIo";
import CityListing from "../citiesListing/cityListing";
import "./cityList.scss";

const CityList = () => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const citiesList = await getCities();
            setCities(citiesList);
        }
        fetchData();
    }, []);

    socket.on("customerUpdate", (val) => {
        console.log(val)
    })

    return (
        <ul className="city-list">
            {cities.map((city) => {
                return <CityListing key={city.city} cityName={city.city} customerAmmount={city.customers_total} />
            })}
        </ul>
    )
}

export default CityList;