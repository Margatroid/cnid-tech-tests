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

module.exports = app;
