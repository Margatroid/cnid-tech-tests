"use strict";

const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/articles/:articleId", (req, res) => {
  res.render("article", req.params);
});

app.use((req, res, next) => {
  res.status(404).send("Error 404. Page not found.");
});

module.exports = app;
