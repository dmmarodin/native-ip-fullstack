const request = require("supertest");

const App = require("../app");
const app = new App().express;

describe("get number of customers by city", () => {
  test("should return array of total customers by city", async () => {
    await request(app)
      .get("/customer/city")
      .expect("Content-Type", /application\/json/)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0]).toHaveProperty("city");
        expect(res.body[0]).toHaveProperty("customers_total");
      });
  });
});

describe("get customer by id", () => {
  test("should return object with customer data", async () => {
    const customerId = 1;

    await request(app)
      .get(`/customer/${customerId}`)
      .expect("Content-Type", /application\/json/)
      .expect(200)
      .then((res) => {
        const customer = res.body;
        expect(typeof customer).toBe("object");
        expect(customer).toHaveProperty("id", 1);
        expect(customer).toHaveProperty("first_name", "Harald");
        expect(customer).toHaveProperty("last_name", "Hardrada");
        expect(customer).toHaveProperty("email", "harald@hardrada.com");
        expect(customer).toHaveProperty("gender", "Male");
        expect(customer).toHaveProperty("company", "Norwegian Throne");
        expect(customer).toHaveProperty("city", "Ringerike, Norway");
        expect(customer).toHaveProperty("title", "King");
      });
  });

  test("should return 400 bad request on invalid id", async () => {
    const customerId = "abc";

    await request(app)
      .get(`/customer/${customerId}`)
      .expect("Content-Type", /application\/json/)
      .expect(400)
      .then((res) => {
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toMatch(/id/);
      });
  });

  test("should return 404 on empty id", async () => {
    await request(app).get("/customer/").expect(404);
  });

  test("should return 404 on valid id but customer not found", async () => {
    await request(app)
      .get("/customer/1000000000000001")
      .expect("Content-Type", /application\/json/)
      .expect(404)
      .then((res) => {
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toMatch(/encontrado/);
      });
  });
});

describe("customers by city", () => {
  test("should return array of customers", async () => {
    const city = "Brookhaven, DC";

    await request(app)
      .get(`/customer/city/${city}`)
      .expect("Content-Type", /application\/json/)
      .expect(200)
      .then((res) => {
        const customer = res.body;
        expect(Array.isArray(customer)).toBe(true);
        expect(typeof customer[0]).toBe("object");
        expect(customer[0]).toHaveProperty("id");
        expect(customer[0]).toHaveProperty("first_name");
        expect(customer[0]).toHaveProperty("last_name");
        expect(customer[0]).toHaveProperty("email");
        expect(customer[0]).toHaveProperty("company");
      });
  });

  test("should return 404 if city was not found", async () => {
    await request(app)
      .get("/customer/city/abc")
      .expect("Content-Type", /application\/json/)
      .expect(404)
      .then((res) => {
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toMatch(/encontrada/);
      });
  });
});

describe("update customer by id", () => {
  const customer_mock = {
    first_name: "Harald",
    last_name: "Hardrada",
    email: "harald@hardrada.com",
    gender: "Male",
    company: "Norwegian Throne",
    city: "Ringerike, Norway",
    title: "King",
  };

  const customerId = 1;

  test("should return success on updating customer with valid data", async () => {
    await request(app)
      .put(`/customer/${customerId}`)
      .set("Content-Type", "application/json")
      .send(JSON.stringify(customer_mock))
      .expect(200);
  });

  test("should return 400 on invalid id", async () => {
    await request(app)
      .put(`/customer/${customerId}`)
      .send(JSON.stringify(customer_mock))
      .expect(400)
      .then((res) => {
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toMatch(/id/);
      });
  });

  test("should return 404 on omitted id", async () => {
    await request(app)
      .put(`/customer/`)
      .send(JSON.stringify(customer_mock))
      .expect(404);
  });

  test("should return 400 on missing data", async () => {
    await request(app)
      .put(`/customer/${customerId}`)
      .send(JSON.stringify({}))
      .expect(400)
      .then((res) => {
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toMatch(/obrigatórios/);
      });
  });

  test("should return 400 on invalid email", async () => {
    await request(app)
      .put(`/customer/${customerId}`)
      .send(JSON.stringify({...customer_mock, email: "abc"}))
      .expect(400)
      .then((res) => {
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toMatch(/email/);
      });
  });

  test("should return 404 on customer not found", async () => {
    console.log(customer_mock)
    await request(app)
      .put(`/customer/10000000001`)
      .set("Content-Type", "application/json")
      .send(JSON.stringify(customer_mock))
      .expect(404)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toMatch(/cliente/);
      });
  });
});
