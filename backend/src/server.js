const App = require("./app");

const app = new App();
app.server.listen(process.env.PORT, () => {
    console.log(`Server opened - Listening on port ${process.env.PORT}`)
});
