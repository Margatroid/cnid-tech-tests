"use strict";

const express = require("express");
const app = express();
const articleModel = require("./models/article");

app.set("view engine", "ejs");

// Index page.
app.get("/", async (req, res, next) => {
  try {
    const articles = await articleModel.index();
    res.render("index", { articles });
  } catch (error) {
    next(error);
  }
});

// Article page.
app.get("/articles/:articleId", async (req, res) => {
  try {
    const id = parseInt(req.params.articleId, 10);
    const article = await articleModel.get(id);
    res.render("article", article);
  } catch (error) {
    res.sendStatus(404);
  }
});

// 404 handler.
app.use((req, res, next) => {
  res.status(404).send("Error 404. Page not found.");
});

module.exports = app;
