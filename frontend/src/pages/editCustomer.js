import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CustomerForm from "../components/customerForm/customerForm";
import Wrapper from "../components/UI/wrapper/wrapper";
import { getClientById, updateCustomer } from "../services/requestData";


const EditCustomer = () => {
    const { id } = useParams();
    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [company, setCompany] = useState("");
    const [city, setCity] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        async function FetchData() {
            const customerData = await getClientById(id);
            setFirstName(customerData.first_name);
            setLastName(customerData.last_name);
            setEmail(customerData.email);
            setGender(customerData.gender);
            setCompany(customerData.company);
            setCity(customerData.city);
            setTitle(customerData.title);
        }
        FetchData();
    }, [id]);

    const submitHandler = (e) => {
        e.preventDefault();

        const customer = {
            first_name: firstName,
            last_name: lastName,
            email,
            gender,
            company,
            city,
            title
        }

        updateCustomer(id, customer).then(() => {
            history.goBack();
        });
    }

    return (
        <Wrapper>
            <CustomerForm 
                onSubmit={submitHandler}
                firstNameState={{firstName, setFirstName}}
                lastNameState={{lastName, setLastName}}
                emailState={{email, setEmail}}
                genderState={{gender, setGender}}
                companyState={{company, setCompany}}
                cityState={{city, setCity}}
                titleState={{title, setTitle}}
            />
        </Wrapper>
    )
}

export default EditCustomer;