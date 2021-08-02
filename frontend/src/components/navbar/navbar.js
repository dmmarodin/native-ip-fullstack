import { Link } from "react-router-dom";
import Card from "../UI/card/card";

import "./navbar.scss";

const NavBar = () => {
    return (
        <Card>
            <nav className="navbar">
                <Link to="/">Overview</Link>
            </nav>
        </Card>
    )
};


export default NavBar;