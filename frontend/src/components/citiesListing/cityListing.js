import { Link } from "react-router-dom";
import Card from "../UI/card/card";

import "./cityListing.scss";

const CityListing = (props) => {
    return (
    <li className="city-listing">
        <Link to={"cities/" + encodeURI(props.cityName)}>
            <Card>
                <div className="city-listing_title">{props.cityName}</div>
                <div className="city-listing_value">
                    <div className="city-listing_customers">{props.customerAmmount}</div>
                    <div className="city_listing_customerTitle">Clientes</div>
                </div>
            </Card>
        </Link>
    </li>
    )
}

export default CityListing;