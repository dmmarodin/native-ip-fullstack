import { Route } from "react-router-dom";

import NavBar from "./components/navbar/navbar";
import Dashboard from "./pages/dashboard";
import CustomersByCity from "./pages/customersByCity";
import EditCustomer from "./pages/editCustomer";

function App() {
  return (
    <div>
      <NavBar />
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/cities/:city">
          <CustomersByCity />
        </Route>
        <Route path="/customer/update/:id">
          <EditCustomer />
        </Route>
    </div>
  );
}

export default App;
