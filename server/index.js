const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const Keycloak = require("keycloak-connect");
let memoryStore = new session.MemoryStore();
let keycloak = new Keycloak({ store: memoryStore });

// Attach middleware
// session
app.use(
    session({
        secret: "mySecret",
        resave: false,
        saveUninitialized: true,
        store: memoryStore
    })
);

// cors
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// keycloak
app.use(keycloak.middleware());

// Attach route handler for home page
app.get("/anonymous", (req, res, next) => {
    console.log("/anonymous");
    res.json({ user: "Anonymous" });
});

app.get("/user", keycloak.protect(), function (req, res) {
    console.log("/user");
    res.send({
        user: "common_user"
    });
});

// Start server
app.listen(9000, () => {
    console.log("Server listening on port 9000!");
});
