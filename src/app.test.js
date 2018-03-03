"use strict";

const request = require("supertest");
const app = require("../src/app");
const articleModel = require("../src/models/article");

describe("routing", () => {
  it("will render root", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);

    // Assert two random titles from the dataset.
    expect(res.text).toEqual(
      expect.stringContaining("An unknown printer took a")
    );
    expect(res.text).toEqual(
      expect.stringContaining("It was popularised in the 1960s")
    );
  });

  it("will render an article title", async () => {
    const res = await request(app).get("/articles/1");
    expect(res.statusCode).toBe(200);

    expect(res.text).toEqual(
      expect.stringContaining("Lorem Ipsum has been the")
    );
  });

  it("will 404 if article does not exist", async () => {
    const res = await request(app).get("/articles/999");
    expect(res.statusCode).toBe(404);
  });

  it("will 404 if page is not found", async () => {
    const res = await request(app).get("/where-am-i");
    expect(res.statusCode).toBe(404);
    expect(res.text).toEqual("Error 404. Page not found.");
  });
});

describe("css path", () => {
  it("will load the correct css path", async () => {
    const res = await request(app).get("/articles/1");
    expect(res.text).toEqual(
      expect.stringContaining(
        '<link rel="stylesheet" type="text/css" href="/styling.css">'
      )
    );
  });
});

describe("article page", () => {
  it("loads article image", async () => {
    const res = await request(app).get("/articles/2");
    const articleData = await articleModel.get(2);

    expect(res.text).toEqual(
      expect.stringContaining(`src="${articleData.cover}`)
    );
  });

  it("will render a h2 correctly", async () => {
    const res = await request(app).get("/articles/9");
    expect(res.text).toEqual(
      expect.stringContaining("<h2>I hacked the Pentagon")
    );
  });

  it("will render a plaintext correctly", async () => {
    const res = await request(app).get("/articles/3");
    expect(res.text).toEqual(
      expect.stringContaining("<p>Landjaeger pork pastrami")
    );
  });

  it("will render a pullquote correctly", async () => {
    const res = await request(app).get("/articles/3");
    expect(res.text).toEqual(
      expect.stringContaining(
        '<blockquote class="content__pullquote">If one examines the postdeconstructive paradigm'
      )
    );
  });

  it("renders every page without errors", async () => {
    const articles = await articleModel.index();
    articles.forEach(async article => {
      const res = await request(app).get(`/articles/${article.id}`);
      expect(res.statusCode).toBe(200);
    });
  });
});
