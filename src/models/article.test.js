"use strict";

const articleModel = require("./article");

it("will get all article titles", async () => {
  const articles = await articleModel.index();
  expect(articles.length).toEqual(10);
  expect(articles[0].title).toEqual(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
  );
});

it("will get data for a particular article", async () => {
  const article = await articleModel.get(2);
  expect(article.title).toEqual(
    "An unknown printer took a galley of type and scrambled it"
  );
});

it("will reject if article ID does not exist", async () => {
  await expect(articleModel.get(1000)).rejects.toEqual(
    "Cannot find article with ID 1000"
  );
});
