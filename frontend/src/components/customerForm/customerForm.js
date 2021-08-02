import Card from "../UI/card/card";
import Input from "../UI/input/input";
import Button from "../UI/button/button";
import "./customerForm.scss";

const CustomerForm = (props) => {
    return (
        <div className="customer-form">
            <Card>
                <h1>Editar Cliente</h1>
                <form onSubmit={props.onSubmit || (e => e.preventDefault())}>
                    <Input id="first_name" name="Primeiro nome" onChange={val => props.firstNameState.setFirstName(val)} value={props.firstNameState.firstName} />
                    <Input id="last_name" name="Último nome" onChange={val => props.lastNameState.setLastName(val)} value={props.lastNameState.lastName} />
                    <Input id="email" name="Email" onChange={val => props.emailState.setEmail(val)} value={props.emailState.email} />
                    <Input id="gender" name="Sexo" onChange={val => props.genderState.setGender(val)} value={props.genderState.gender} />
                    <Input id="company" name="Empresa" onChange={val => props.companyState.setCompany(val)} value={props.companyState.company} />
                    <Input id="city" name="Cidade" onChange={val => props.cityState.setCity(val)} value={props.cityState.city} />
                    <Input id="title" name="Posição" onChange={val => props.titleState.setTitle(val)} value={props.titleState.title} />
                    <Button type="submit">Salvar</Button>
                </form>
            </Card>
        </div>
    )
}

export default CustomerForm;