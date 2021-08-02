import { Link } from "react-router-dom";
import "./customerListing.scss";

const CustomerListing = (props) => {
    return (
        <tr className="customer-listing">
            <td className="customer-listing_name">{props.customer.first_name + " " + props.customer.last_name}</td>
            <td>{props.customer.email}</td>
            <td>{props.customer.company}</td>
            <td>{props.customer.title}</td>
            <td className="customer-listing_edit"><Link to={"/customer/update/" + props.customer.id}>editar</Link></td>
        </tr>
    )
}

export default CustomerListing;