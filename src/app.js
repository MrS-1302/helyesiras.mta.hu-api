const express = require('express')
const app = express()
const api = require("./api/index")
const db = require('./connection');

app.use("/api", api)

app.all('*', async (req, res, next) => {
    res.json({
        status: "nope"
    })
});

module.exports = app;