const customerService = require("./customer");

describe("getClientById", () => {
    test("should return a valid customer object", () => {
        return customerService.getCustomerById(1).then((customer) => {
            expect(typeof customer).toBe('object');
            expect(customer).toHaveProperty('id');
            expect(customer).toHaveProperty('first_name');
            expect(customer).toHaveProperty('last_name');
            expect(customer).toHaveProperty('email');
            expect(customer).toHaveProperty('gender');
            expect(customer).toHaveProperty('company');
            expect(customer).toHaveProperty('city');
            expect(customer).toHaveProperty('title');
        });
    });

    test("should return empty on invalid id", () => {
        return customerService.getCustomerById(-1).then((customer) => {
            expect(customer).toEqual({});
        });
    });

    test("should return empty on unkown id", () => {
        return customerService.getCustomerById(1000000000001).then((customer) => {
            expect(customer).toEqual({});
        });
    });
});

describe("getNumClientsByCities", () => {
    test("should return array of objects of city name and number of customers in that city", () => {
        return customerService.getNumClientsByCities().then((cities) => {
            expect(Array.isArray(cities)).toBeTruthy();
            expect(typeof cities[0]).toBe("object");
            expect(cities[0]).toHaveProperty("city");
            console.log(cities[0])
            expect(cities[0]).toHaveProperty("customers_total");
        });
    });
});

describe("getCustomersByCity", () => {
    test("should return an array of customers filtered by city", () => {
        return customerService.getCustomersByCity("Brookhaven, DC").then((customers) => {
            expect(Array.isArray(customers)).toBeTruthy();
            expect(typeof customers[0]).toBe("object");
            expect(customers[0]).toHaveProperty("id");
            expect(customers[0]).toHaveProperty("first_name");
            expect(customers[0]).toHaveProperty("last_name");
            expect(customers[0]).toHaveProperty("email");
            expect(customers[0]).toHaveProperty("company");
        });
    });

    test("should return null on unkown city", () => {
        return customerService.getCustomersByCity("TheMoon").then((customers) => {
            expect(customers).toEqual([]);
        });
    });

    test("should return null on invalid city", () => {
        return customerService.getCustomersByCity(-1).then((customers) => {
            expect(customers).toEqual([]);
        });
    });
});

describe("updateCustomer", () => {
    const customer_mock = {
        first_name: "Harald",
        last_name: "Hardrada",
        email: "harald@hardrada.com",
        gender: "Male",
        company: "Norwegian Throne",
        city: "Ringerike, Norway",
        title: "King"
    }

    test("should return success on update", () => {
        return customerService.updateCustomer(1, customer_mock).then((result) => {
            console.log(result)
            expect(result).toBe(true);
            return customerService.getCustomerById(1);
        }).then((customer) => {
            expect(typeof customer).toBe('object');
            expect(customer).toHaveProperty('id', 1);
            expect(customer).toHaveProperty('first_name', "Harald");
            expect(customer).toHaveProperty('last_name', "Hardrada");
            expect(customer).toHaveProperty('email', "harald@hardrada.com");
            expect(customer).toHaveProperty('gender', "Male");
            expect(customer).toHaveProperty('company', "Norwegian Throne");
            expect(customer).toHaveProperty('city', "Ringerike, Norway");
            expect(customer).toHaveProperty('title', "King");
        });
    })

    test("should return false on id not found", () => {
        return customerService.updateCustomer(1, customer_mock).then((result) => {
            expect(result).toBe(false);
        });
    });
});