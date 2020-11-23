const express = require("express");
const app = express();
const session = require("express-session");
const Keycloak = require("keycloak-connect");
var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

// Configure session
app.use(
    session({
        secret: "mySecret",
        resave: false,
        saveUninitialized: true,
        store: memoryStore
    })
);

// Attach middleware
app.use(keycloak.middleware());

// Attach route handler for home page
app.get("/", (req, res, next) => {
    res.json({ status: "Public page" });
});

app.get("/users", keycloak.protect("common_user"), function (req, res) {
    res.send({
        users: [
            {
                name: "Gosheto",
                age: 31,
                country: "Poland"
            },
            {
                name: "Kateto",
                age: 25,
                country: "Bulgaria"
            }
        ]
    });
});

// Start server
app.listen(9100, () => {
    console.log("Server listening on port 9100!");
});
