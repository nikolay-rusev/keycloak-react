const express = require("express");
const server = express();
const cors = require("cors");
const session = require("express-session");
const Keycloak = require("keycloak-connect");
let memoryStore = new session.MemoryStore();
let keycloak = new Keycloak({ store: memoryStore });

// Attach middleware
// session
server.use(
    session({
        secret: "mySecret",
        resave: false,
        saveUninitialized: true,
        store: memoryStore
    })
);

// cors
server.use(cors());
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
});

// keycloak
server.use(keycloak.middleware());

// Attach route handler for home page
server.get("/anonymous", (req, res, next) => {
    console.log("/anonymous");
    res.json({ user: "Anonymous" });
});

server.get("/users", keycloak.protect(), function (req, res) {
    console.log("/users");
    res.send({
        user: "common_user"
    });
});

// Start server
server.listen(9000, () => {
    console.log("Server listening on port 9000!");
});
