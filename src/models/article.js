"use strict";

const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

const readData = async () => {
  const fileData = await readFile("./data/article.json");
  return JSON.parse(fileData);
};

// Get all article titles and pictures.
exports.index = async () => {
  const articles = await readData();
  return articles.map(article => {
    return { id: article.id, title: article.id, cover: article.cover };
  });
};

// Get all data for particular article ID.
exports.get = async id => {
  const articles = await readData();
  const article = articles.find(article => article.id === id);

  if (typeof article === "undefined") {
    throw `Cannot find article with ID ${id}`;
  }
  return article;
};
