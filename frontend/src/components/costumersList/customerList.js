import CostumerListing from "../costumerListing/customerListing";
import Card from "../UI/card/card";
import Table from "../UI/table/table";
import "./customerList.scss";

const CustomerList = (props) => {
    const headers = [
        "nome",
        "email",
        "empresa",
        "posição",
        "opções"
    ]

    return (
        <Card>
            <Table headers={headers} className="customer-table">
                {props.customers.map((customer) => {
                    return <CostumerListing key={customer.id} customer={customer} />
                })}
            </Table>
        </Card>
    );
}

export default CustomerList;