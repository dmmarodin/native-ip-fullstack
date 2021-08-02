import { useState, useEffect } from "react";
import { getClientsByCity } from "../services/requestData";
import { useParams } from "react-router-dom";
import Wrapper from "../components/UI/wrapper/wrapper";
import CostumerList from "../components/costumersList/customerList";

const CustomersByCity = () => {
    const { city } = useParams();

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const customerList = await getClientsByCity(city);
            setCustomers(customerList);
        }
        fetchData();
    }, [city]);

    return (
        <Wrapper>
            <CostumerList customers={customers}></CostumerList>
        </Wrapper>
    )
}

export default CustomersByCity;